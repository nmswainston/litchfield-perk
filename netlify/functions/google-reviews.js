/**
 * Netlify Serverless Function: Google Reviews Proxy
 * 
 * Securely fetches Google Places reviews without exposing API key to client.
 * Maps Google review data to our site's expected review object shape.
 */

export default async (_req, _context) => {
  const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  // Response headers with edge caching
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=0, s-maxage=21600", // 6 hours edge cache
  };

  // Validate environment variables - return 500 if missing
  if (!GOOGLE_PLACE_ID || !GOOGLE_PLACES_API_KEY) {
    return new Response(
      JSON.stringify({
        status: "error",
        error_message: "Missing required environment variables: GOOGLE_PLACE_ID and/or GOOGLE_PLACES_API_KEY",
        placeName: null,
        rating: 0,
        total: 0,
        reviews: [],
      }),
      { status: 500, headers }
    );
  }

  try {
    // Call Google Places Details API
    const apiUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    apiUrl.searchParams.set("place_id", GOOGLE_PLACE_ID);
    apiUrl.searchParams.set("fields", "name,rating,user_ratings_total,reviews");
    apiUrl.searchParams.set("reviews_sort", "newest");
    apiUrl.searchParams.set("key", GOOGLE_PLACES_API_KEY);

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      // Return 502 for HTTP errors from Google API
      return new Response(
        JSON.stringify({
          status: "error",
          error_message: `Google API HTTP error: ${response.status}`,
          placeName: null,
          rating: 0,
          total: 0,
          reviews: [],
        }),
        { status: 502, headers }
      );
    }

    const data = await response.json();

    // Handle Google API error responses - return 502 with status and error_message
    if (data.status !== "OK") {
      return new Response(
        JSON.stringify({
          status: data.status || "error",
          error_message: data.error_message || `Google API error: ${data.status}`,
          placeName: null,
          rating: 0,
          total: 0,
          reviews: [],
        }),
        { status: 502, headers }
      );
    }

    const result = data.result || {};
    const googleReviews = result.reviews || [];

    // Map Google reviews to our site's review object shape
    const reviews = googleReviews
      .filter((googleReview) => googleReview) // Filter out null/undefined
      .map((googleReview) => {
        // Format date as "MMM D, YYYY" (e.g., "Jan 2, 2026")
        const dateStr = formatReviewDate(googleReview.time);

        // Generate avatar (first letter of author name, fallback to "⭐")
        const avatar = generateAvatar(googleReview.author_name);

        return {
          name: googleReview.author_name || "Anonymous",
          text: googleReview.text || "", // Keep empty text, don't crash
          rating: googleReview.rating || 5,
          date: dateStr,
          avatar: avatar,
          source: "google",
          url: googleReview.author_url || null,
        };
      });

    // Return response in expected format
    return new Response(
      JSON.stringify({
        placeName: result.name || null,
        rating: result.rating || 0,
        total: result.user_ratings_total || 0,
        reviews: reviews,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    // Log error for server-side debugging
    console.error("Error fetching Google reviews:", error);

    // Return 502 for unexpected errors
    return new Response(
      JSON.stringify({
        status: "error",
        error_message: error.message || "Unexpected error fetching reviews",
        placeName: null,
        rating: 0,
        total: 0,
        reviews: [],
      }),
      { status: 502, headers }
    );
  }
};

/**
 * Format Google timestamp to "MMM D, YYYY" format (e.g., "Jan 2, 2026")
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted date string
 */
function formatReviewDate(timestamp) {
  if (!timestamp) return "Recently";

  const date = new Date(timestamp * 1000);
  const options = { year: "numeric", month: "short", day: "numeric" };
  // toLocaleDateString returns format like "Jan 2, 2026" which matches "MMM D, YYYY"
  return date.toLocaleDateString("en-US", options);
}

/**
 * Generate avatar from author name (first letter, fallback to "⭐")
 * @param {string} name - Author name
 * @returns {string} Avatar string
 */
function generateAvatar(name) {
  if (!name || name.trim().length === 0) return "⭐";

  // Get first letter of first word, uppercase
  const firstLetter = name.trim().charAt(0).toUpperCase();
  return firstLetter || "⭐";
}

