/**
 * Reviews Utility Functions
 * 
 * Fetches Google reviews via secure Netlify function proxy.
 * Returns reviews in the format expected by ReviewsSection component.
 */

/**
 * Get reviews from Google Places API via Netlify function
 * 
 * Fetches reviews from the secure serverless function endpoint.
 * Returns empty array on error (UI handles empty state gracefully).
 * 
 * @returns {Promise<Array>} Array of review objects with shape:
 *   { name, text, rating, date, avatar, source, url }
 */
export async function getReviews() {
  try {
    const response = await fetch('/.netlify/functions/google-reviews');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return only the reviews array (UI expects just the array)
    return data.reviews || [];
  } catch (error) {
    // Log error in development, but don't crash the UI
    if (import.meta.env.DEV) {
      console.error('Error fetching reviews:', error);
    }
    
    // Return empty array - ReviewsSection handles empty state gracefully
    return [];
  }
}
