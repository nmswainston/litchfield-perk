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
 * 
 * CACHING: Implements HTTP caching headers and in-memory caching to reduce API calls.
 * - HTTP Cache-Control: Browser (10min), CDN (1hr), stale-while-revalidate (24hr)
 * - In-memory cache: 5 minute TTL (best-effort, resets on cold start)
 */

// In-memory cache (module-level, resets on cold start)
// Structure: { [placeId]: { response, fetched_at, cached_at } }
const memoryCache = {};

// Cache TTL: 5 minutes in milliseconds
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Get cached data if fresh
 * @param {string} placeId - Google Place ID
 * @returns {object|null} Cached data or null if expired/missing
 */
function getCachedData(placeId) {
  const cached = memoryCache[placeId];
  if (!cached) return null;
  
  const age = Date.now() - cached.cached_at;
  if (age >= CACHE_TTL_MS) {
    // Cache expired, remove it
    delete memoryCache[placeId];
    return null;
  }
  
  return cached;
}

/**
 * Store data in cache
 * @param {string} placeId - Google Place ID
 * @param {object} data - Data to cache (should include response, fetched_at, cached_at)
 */
function setCachedData(placeId, data) {
  memoryCache[placeId] = data;
}

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

  // Success response headers with HTTP caching
  const successHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
    ...corsHeaders,
  };

  // Error response headers (no caching)
  const errorHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...corsHeaders,
  };

  // Validate environment variables - return 500 if missing
  if (!GOOGLE_PLACE_ID || !GOOGLE_PLACES_API_KEY) {
    return {
      statusCode: 500,
      headers: errorHeaders,
      body: JSON.stringify({
        status: "error",
        error_message: "Missing required environment variables: GOOGLE_PLACE_ID and/or GOOGLE_PLACES_API_KEY",
        rating: 0,
        user_ratings_total: 0,
        reviews: [],
      }),
    };
  }

  // Check in-memory cache first
  const cachedData = getCachedData(GOOGLE_PLACE_ID);
  if (cachedData) {
    console.log("cache hit");
    const ageSeconds = Math.floor((Date.now() - cachedData.cached_at) / 1000);
    return {
      statusCode: 200,
      headers: successHeaders,
      body: JSON.stringify({
        ...cachedData.response,
        fetched_at: cachedData.fetched_at,
        cache: {
          source: "memory",
          age_seconds: ageSeconds,
        },
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
      
      // Check if we have cached data to return
      const staleCache = getCachedData(GOOGLE_PLACE_ID);
      if (staleCache) {
        const ageSeconds = Math.floor((Date.now() - staleCache.cached_at) / 1000);
        return {
          statusCode: 200,
          headers: successHeaders,
          body: JSON.stringify({
            ...staleCache.response,
            warning: "Serving cached data due to upstream error",
            fetched_at: staleCache.fetched_at,
            cache: {
              source: "memory",
              age_seconds: ageSeconds,
            },
          }),
        };
      }
      
      // Return 502 for HTTP errors from Google API (no cache available)
      return {
        statusCode: 502,
        headers: errorHeaders,
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
      
      // Check if we have cached data to return
      const staleCache = getCachedData(GOOGLE_PLACE_ID);
      if (staleCache) {
        const ageSeconds = Math.floor((Date.now() - staleCache.cached_at) / 1000);
        return {
          statusCode: 200,
          headers: successHeaders,
          body: JSON.stringify({
            ...staleCache.response,
            warning: "Serving cached data due to upstream error",
            fetched_at: staleCache.fetched_at,
            cache: {
              source: "memory",
              age_seconds: ageSeconds,
            },
          }),
        };
      }
      
      return {
        statusCode: 502,
        headers: errorHeaders,
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

    // Prepare response data
    const responseData = {
      rating: result.rating || 0,
      user_ratings_total: result.user_ratings_total || 0,
      reviews: reviews,
    };

    // Cache successful response
    const fetchedAt = new Date().toISOString();
    setCachedData(GOOGLE_PLACE_ID, {
      response: responseData,
      fetched_at: fetchedAt,
      cached_at: Date.now(),
    });

    // Return sanitized response with metadata (no raw API payloads, no secrets)
    return {
      statusCode: 200,
      headers: successHeaders,
      body: JSON.stringify({
        ...responseData,
        fetched_at: fetchedAt,
        cache: {
          source: "google",
          age_seconds: 0,
        },
      }),
    };
  } catch (error) {
    // Log error for server-side debugging (no secrets in logs)
    console.error("Error fetching Google reviews:", {
      message: error.message,
      stack: error.stack,
    });

    // Check if we have cached data to return
    const staleCache = getCachedData(GOOGLE_PLACE_ID);
    if (staleCache) {
      const ageSeconds = Math.floor((Date.now() - staleCache.cached_at) / 1000);
      return {
        statusCode: 200,
        headers: successHeaders,
        body: JSON.stringify({
          ...staleCache.response,
          warning: "Serving cached data due to upstream error",
          fetched_at: staleCache.fetched_at,
          cache: {
            source: "memory",
            age_seconds: ageSeconds,
          },
        }),
      };
    }

    // Return 502 for unexpected errors (no cache available)
    return {
      statusCode: 502,
      headers: errorHeaders,
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

