/**
 * Netlify Serverless Function: Google Reviews Proxy
 * 
 * SECURITY: This function runs server-side to protect API keys from client exposure.
 * Google Places API keys should NEVER appear in client-side code or build output.
 * By proxying requests through this serverless function, we ensure API keys remain
 * secure and are only accessible on the server where they cannot be extracted.
 * 
 * Fetches Google Places reviews without exposing API key to client.
 * Returns sanitized review data matching the expected response format.
 */

export const handler = async (event, _context) => {
  // CORS headers for all responses
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle OPTIONS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  // Read environment variables (set in Netlify UI, never in code)
  const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  // Response headers with edge caching
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=0, s-maxage=21600", // 6 hours edge cache
    ...corsHeaders,
  };

  // Validate environment variables - return 500 if missing
  if (!GOOGLE_PLACE_ID || !GOOGLE_PLACES_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        error_message: "Missing required environment variables: GOOGLE_PLACE_ID and/or GOOGLE_PLACES_API_KEY",
        rating: 0,
        user_ratings_total: 0,
        reviews: [],
      }),
    };
  }

  try {
    // Call Google Places Details API
    // SECURITY: API key is only used server-side, never exposed to client
    const apiUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    apiUrl.searchParams.set("place_id", GOOGLE_PLACE_ID);
    apiUrl.searchParams.set("fields", "name,rating,user_ratings_total,reviews");
    apiUrl.searchParams.set("reviews_sort", "newest");
    apiUrl.searchParams.set("key", GOOGLE_PLACES_API_KEY);

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      // Log HTTP error from Google API (no secrets in logs)
      console.error(`Google API HTTP error: ${response.status} ${response.statusText}`);
      
      // Return 502 for HTTP errors from Google API
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          status: "error",
          error_message: `Google API HTTP error: ${response.status}`,
          rating: 0,
          user_ratings_total: 0,
          reviews: [],
        }),
      };
    }

    const data = await response.json();

    // Handle Google API error responses
    if (data.status !== "OK") {
      console.error("Google API error response:", {
        status: data.status,
        error_message: data.error_message,
      });
      
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          status: data.status || "error",
          error_message: data.error_message || `Google API error: ${data.status}`,
          rating: 0,
          user_ratings_total: 0,
          reviews: [],
        }),
      };
    }

    const result = data.result || {};
    const googleReviews = result.reviews || [];

    // Map Google reviews to expected format (sanitized, no raw API payload)
    const reviews = googleReviews
      .filter((googleReview) => googleReview) // Filter out null/undefined
      .map((googleReview) => {
        // Format relative time description from timestamp
        const relativeTime = formatRelativeTime(googleReview.time);

        return {
          author_name: googleReview.author_name || "Anonymous",
          rating: googleReview.rating || 5,
          text: googleReview.text || "",
          relative_time_description: relativeTime,
        };
      });

    // Return sanitized response (no raw API payloads, no secrets)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        rating: result.rating || 0,
        user_ratings_total: result.user_ratings_total || 0,
        reviews: reviews,
      }),
    };
  } catch (error) {
    // Log error for server-side debugging (no secrets in logs)
    console.error("Error fetching Google reviews:", {
      message: error.message,
      stack: error.stack,
    });

    // Return 502 for unexpected errors
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        status: "error",
        error_message: error.message || "Unexpected error fetching reviews",
        rating: 0,
        user_ratings_total: 0,
        reviews: [],
      }),
    };
  }
};

/**
 * Format Google timestamp to relative time description (e.g., "2 weeks ago")
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Relative time description
 */
function formatRelativeTime(timestamp) {
  if (!timestamp) return "Recently";

  const now = Math.floor(Date.now() / 1000);
  const diffSeconds = now - timestamp;
  
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffSeconds / 3600);
  const diffDays = Math.floor(diffSeconds / 86400);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  if (diffWeeks < 4) return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
  if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
}

