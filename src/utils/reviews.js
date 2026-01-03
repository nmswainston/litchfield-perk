/**
 * Reviews Utility Functions
 * 
 * SECURITY: Fetches Google reviews via secure Netlify function proxy.
 * API keys are NEVER exposed to the client - all Google API calls happen server-side.
 * Returns reviews in the format expected by ReviewsSection component.
 */

// Track if we've already warned about Netlify function not being available
let hasWarnedAboutFunction = false;

/**
 * Show warning about Netlify function not being available (only once per session)
 */
function warnAboutFunction() {
  if (!hasWarnedAboutFunction && import.meta.env.DEV) {
    hasWarnedAboutFunction = true;
    console.warn(
      '⚠️ Netlify function not available. Reviews will not be displayed.',
      '\n💡 To test reviews locally, use: npm run dev:netlify',
      '\n💡 This runs the Netlify dev server which includes serverless functions.'
    );
  }
}

/**
 * Check if response is HTML (indicates function not available)
 */
function isHtmlResponse(text) {
  return text.trim().startsWith('<!') || text.trim().startsWith('<html');
}

/**
 * Get reviews from Google Places API via Netlify function
 * 
 * Fetches reviews from the secure serverless function endpoint.
 * The function runs server-side to protect API keys from client exposure.
 * Returns empty array on error (UI handles empty state gracefully).
 * 
 * @returns {Promise<Array>} Array of review objects with shape:
 *   { name, text, rating, date, avatar, source, url }
 */
export async function getReviews() {
  try {
    // SECURITY: Fetch from serverless function - API keys stay on server
    const response = await fetch('/.netlify/functions/googleReviews');

    // Check if response is HTML (indicates function not available)
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      // Likely got HTML instead of JSON - function not available
      warnAboutFunction();
      return [];
    }

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const text = await response.text();
        // Check if response is HTML (function not available)
        if (isHtmlResponse(text)) {
          warnAboutFunction();
          return [];
        }
        // Try to parse as JSON
        const errorData = JSON.parse(text);
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
            '\n💡 Also ensure GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY are set in Netlify environment variables (Site settings → Environment variables).'
          );
        } else {
          console.error('Error fetching reviews:', errorMessage);
        }
      } else {
        console.error('Error fetching reviews:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    // Parse response as JSON, but handle HTML responses gracefully
    let data;
    try {
      const text = await response.text();
      // Check if response is HTML (function not available)
      if (isHtmlResponse(text)) {
        warnAboutFunction();
        return [];
      }
      data = JSON.parse(text);
    } catch {
      // If JSON parsing fails, likely got HTML instead
      warnAboutFunction();
      return [];
    }

    // Transform function response format to UI format
    // Function returns: { author_name, rating, text, relative_time_description }
    // UI expects: { name, text, rating, date, avatar, source, url }
    const reviews = (data.reviews || []).map((review) => {
      // Generate avatar from first letter of author name
      const avatar = review.author_name && review.author_name.trim().length > 0
        ? review.author_name.trim().charAt(0).toUpperCase()
        : "⭐";

      return {
        name: review.author_name || "Anonymous",
        text: review.text || "",
        rating: review.rating || 5,
        date: review.relative_time_description || "Recently",
        avatar: avatar,
        source: "google",
        url: null, // Not provided in function response
      };
    });

    return reviews;
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
