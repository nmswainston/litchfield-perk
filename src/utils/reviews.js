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
      // Try to get error details from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error_message) {
          errorMessage = errorData.error_message;
        }
      } catch {
        // If response isn't JSON, use default message
      }
      
      // Provide helpful error messages for common issues
      if (response.status === 502) {
        if (import.meta.env.DEV) {
          console.error(
            '⚠️ Netlify function error (502):',
            errorMessage,
            '\n💡 Tip: Make sure you are running "npm run dev:netlify" (not "npm run dev")',
            '\n💡 Also ensure GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY are set in your environment variables.'
          );
        } else {
          console.error('Error fetching reviews:', errorMessage);
        }
      } else {
        console.error('Error fetching reviews:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Return only the reviews array (UI expects just the array)
    return data.reviews || [];
  } catch (error) {
    // Log error in development, but don't crash the UI
    if (import.meta.env.DEV) {
      // More helpful error message for development
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.error(
          '🌐 Network error fetching reviews:',
          error.message,
          '\n💡 This usually means the Netlify function is not running.',
          '\n💡 For local development, use: npm run dev:netlify',
          '\n💡 For production, ensure the function is deployed and environment variables are set.'
        );
      } else {
        console.error('Error fetching reviews:', error);
      }
    }
    
    // Return empty array - ReviewsSection handles empty state gracefully
    return [];
  }
}
