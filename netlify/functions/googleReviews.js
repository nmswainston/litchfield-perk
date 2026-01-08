// Build fingerprint to verify deployed code version
const BUILD_FINGERPRINT = "googleReviews-v1-2025-01-27-a";

export default async (_req, _context) => {
  // Handle CORS preflight requests
  if (_req.method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: getCorsHeaders(),
    };
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    // Support query param for debugging, but default to env var
    const placeId = _req.queryStringParameters?.placeId || process.env.GOOGLE_PLACE_ID;

    if (!apiKey) {
      return json(500, {
        build: BUILD_FINGERPRINT,
        error: "Missing GOOGLE_PLACES_API_KEY",
        code: "MISSING_API_KEY",
      });
    }
    if (!placeId) {
      return json(500, {
        build: BUILD_FINGERPRINT,
        error: "Missing GOOGLE_PLACE_ID",
        code: "MISSING_PLACE_ID",
      });
    }

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
          error: "Request timeout",
          code: "TIMEOUT",
        });
      }
      throw fetchErr;
    }

    const data = await resp.json();

    if (!resp.ok) {
      // Log full error details server-side
      console.error("Google Places API error:", {
        status: resp.status,
        statusText: resp.statusText,
        data: data,
        url: url, // URL is safe (API key is in headers, not URL)
      });
      
      // Return error with build fingerprint, HTTP status, sanitized URL, and raw Google error
      // Note: URL doesn't contain API key (it's in headers), so safe to include
      return json(resp.status, {
        build: BUILD_FINGERPRINT,
        status: "ERROR",
        error_message: "Google Places API returned an error",
        httpStatus: resp.status,
        url: url, // URL is safe (API key is in headers, not URL)
        google: data, // Raw Google error response
        rating: 0,
        user_ratings_total: 0,
        reviews: [],
      });
    }

    const reviews = Array.isArray(data.reviews) ? data.reviews : [];

    // Normalize to legacy-like shape for frontend compatibility
    return {
      statusCode: 200,
      headers: {
        ...getCorsHeaders(),
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=21600", // 6 hours
      },
      body: JSON.stringify({
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
      }),
    };
  } catch (err) {
    // Log full error server-side
    console.error("Google Reviews function error:", err);
    // Return error with build fingerprint
    return json(500, {
      build: BUILD_FINGERPRINT,
      error: "Function crashed",
      code: "INTERNAL_ERROR",
      message: err.message,
    });
  }
};

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(statusCode, obj) {
  return {
    statusCode,
    headers: {
      ...getCorsHeaders(),
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  };
}
