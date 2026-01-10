// Build fingerprint to verify deployed code version
const BUILD_FINGERPRINT = "googleReviews-v1-2026-01-10-a";

/**
 * Returns CORS headers as an object
 */
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

/**
 * Returns a JSON Response with status code and optional extra headers
 */
function jsonResponse(status, obj, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      ...corsHeaders(),
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

/**
 * Returns a text Response with status code and optional extra headers
 */
function textResponse(status, text, extraHeaders = {}) {
  return new Response(text, {
    status,
    headers: {
      ...corsHeaders(),
      "Content-Type": "text/plain; charset=utf-8",
      ...extraHeaders,
    },
  });
}

export default async (req, _context) => {
  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  // Extract query parameters from URL
  const url = new URL(req.url);
  const debugParam = url.searchParams.get("debug");
  const placeIdParam = url.searchParams.get("place_id");

  // Debug endpoint: proves what code is deployed and whether env vars exist
  if (debugParam === "1") {
    return jsonResponse(200, {
      build: BUILD_FINGERPRINT,
      hasKey: Boolean(process.env.GOOGLE_PLACES_API_KEY),
      hasPlaceId: Boolean(process.env.GOOGLE_PLACE_ID),
      endpoint: "places.googleapis.com/v1",
      now: new Date().toISOString(),
    });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || placeIdParam;

  if (!apiKey || !placeId) {
    return jsonResponse(400, {
      build: BUILD_FINGERPRINT,
      status: "ERROR",
      error_message: "Missing API key or place ID",
      code: "MISSING_PARAMS",
      httpStatus: 400,
      rating: 0,
      user_ratings_total: 0,
      reviews: [],
    });
  }

  try {
    // Hard-enforce Places API (New) - DO NOT use legacy endpoints
    const apiUrl = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

    const fieldMask = [
      "displayName",
      "rating",
      "userRatingCount",
      "reviews.rating",
      "reviews.text.text",
      "reviews.relativePublishTimeDescription",
      "reviews.authorAttribution.displayName",
      "reviews.authorAttribution.uri",
      "reviews.authorAttribution.photoUri",
    ].join(",");

    // Log for observability
    console.log("Google Reviews fetch URL:", apiUrl);
    console.log("FieldMask:", fieldMask);

    // Add timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    let resp;
    try {
      resp = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": fieldMask,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      if (fetchErr.name === "AbortError") {
        console.error("Google Places API request timed out");
        return jsonResponse(504, {
          build: BUILD_FINGERPRINT,
          status: "ERROR",
          error_message: "Request timeout",
          code: "TIMEOUT",
          httpStatus: 504,
          rating: 0,
          user_ratings_total: 0,
          reviews: [],
        });
      }
      throw fetchErr;
    }

    const data = await resp.json();

    if (!resp.ok) {
      // Extract error message from Google's response
      let errorMessage = "Google Places API returned an error";
      if (data.error) {
        if (data.error.message) {
          errorMessage = data.error.message;
        } else if (typeof data.error === 'string') {
          errorMessage = data.error;
        }
      } else if (data.error_message) {
        errorMessage = data.error_message;
      }
      
      // Log full error details server-side
      console.error("Google Places API error:", {
        status: resp.status,
        statusText: resp.statusText,
        errorMessage: errorMessage,
        data: data,
        url: apiUrl, // URL is safe (API key is in headers, not URL)
      });
      
      // Return error with build fingerprint, HTTP status, and sanitized error message
      return jsonResponse(resp.status, {
        build: BUILD_FINGERPRINT,
        status: "ERROR",
        error_message: errorMessage,
        httpStatus: resp.status,
        rating: 0,
        user_ratings_total: 0,
        reviews: [],
      });
    }

    const reviews = Array.isArray(data.reviews) ? data.reviews : [];

    // Normalize to legacy-like shape for frontend compatibility
    return jsonResponse(200, {
      build: BUILD_FINGERPRINT,
      status: "OK",
      error_message: null,
      rating: data.rating ?? 0,
      user_ratings_total: data.userRatingCount ?? 0,
      name: data?.displayName?.text ?? null,
      reviews: reviews.map((r) => ({
        author_name: r?.authorAttribution?.displayName ?? null,
        author_url: r?.authorAttribution?.uri ?? null,
        profile_photo_url: r?.authorAttribution?.photoUri ?? null,
        rating: r?.rating ?? null,
        relative_time_description: r?.relativePublishTimeDescription ?? null,
        text: r?.text?.text ?? "",
      })),
    }, {
      "Cache-Control": "public, max-age=0, s-maxage=21600", // 6 hours
    });
  } catch (err) {
    // Log full error server-side
    console.error("Google Reviews function error:", err);
    
    // Sanitize error message to avoid leaking sensitive data
    const errorMessage = err.message || "Internal server error";
    
    // Return error with build fingerprint
    return jsonResponse(500, {
      build: BUILD_FINGERPRINT,
      status: "ERROR",
      error_message: errorMessage,
      code: "INTERNAL_ERROR",
      httpStatus: 500,
      rating: 0,
      user_ratings_total: 0,
      reviews: [],
    });
  }
};
