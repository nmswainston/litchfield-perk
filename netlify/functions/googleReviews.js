// Build fingerprint to verify deployed code version
const BUILD_FINGERPRINT = "googleReviews-v1-2026-01-10-a";

/**
 * Returns CORS headers as an object
 */
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

/**
 * Returns a JSON response in Netlify Functions format
 */
function json(statusCode, obj, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      ...getCorsHeaders(),
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
    body: JSON.stringify(obj),
  };
}

export default async (req, _context) => {
  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: getCorsHeaders(),
      body: "",
    };
  }

  // Netlify Functions (Node) usually provides queryStringParameters
  const qs = req?.queryStringParameters || {};

  // Debug endpoint: proves what code is deployed and whether env vars exist
  if (qs.debug === "1") {
    return json(200, {
      build: BUILD_FINGERPRINT,
      runtime: "netlify-function",
      hasKey: Boolean(process.env.GOOGLE_PLACES_API_KEY),
      hasPlaceId: Boolean(process.env.GOOGLE_PLACE_ID),
      endpoint: "places.googleapis.com/v1",
      now: new Date().toISOString(),
    });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || qs.place_id;

  if (!apiKey || !placeId) {
    return json(400, {
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
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

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
    console.log("Google Reviews fetch URL:", url);
    console.log("FieldMask:", fieldMask);

    // Add timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    let resp;
    try {
      resp = await fetch(url, {
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
        return json(504, {
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
        url: url, // URL is safe (API key is in headers, not URL)
      });
      
      // Return error with build fingerprint, HTTP status, and sanitized error message
      return json(resp.status, {
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
    return json(200, {
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
    return json(500, {
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
