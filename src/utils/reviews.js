let hasWarnedAboutFunction = false;

function warnAboutFunction() {
  if (!hasWarnedAboutFunction && import.meta.env.DEV) {
    hasWarnedAboutFunction = true;
    console.warn('Netlify function not available. Use: npm run dev:netlify');
  }
}

function isHtmlResponse(text) {
  return text.trim().startsWith('<!') || text.trim().startsWith('<html');
}

export async function getReviews() {
  try {
    const response = await fetch('/.netlify/functions/googleReviews');
    const contentType = response.headers.get('content-type') || '';
    
    // Read response text once
    const text = await response.text();
    
    // Check if response is HTML (function not available)
    if (isHtmlResponse(text) || !contentType.includes('application/json')) {
      warnAboutFunction();
      return [];
    }

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let helpfulMessage = null;
      
      try {
        const errorData = JSON.parse(text);
        if (errorData.error_message) {
          errorMessage = errorData.error_message;
        }
        
        // Check for Google API key authorization errors
        if (errorMessage.includes('API key is not authorized') || 
            errorMessage.includes('not authorized to use this service')) {
          helpfulMessage = 'Google API key configuration issue. Please check:\n' +
            '1. The API key has "Places API (New)" enabled in Google Cloud Console\n' +
            '2. API key restrictions allow the Places API\n' +
            '3. The API key is correctly set in Netlify environment variables';
        }
        
        // Check for missing API key or place ID
        if (errorData.code === 'MISSING_API_KEY' || errorData.code === 'MISSING_PLACE_ID') {
          helpfulMessage = `Missing required configuration: ${errorData.error || errorData.code}`;
        }
      } catch {
        // If parsing fails, use default error message
      }
      
      const finalMessage = helpfulMessage || errorMessage;
      
      if (response.status === 502 && import.meta.env.DEV) {
        console.error('Netlify function error (502):', finalMessage);
        if (helpfulMessage) {
          console.error('Troubleshooting:', helpfulMessage);
        }
      } else {
        console.error('Error fetching reviews:', finalMessage);
      }
      
      throw new Error(finalMessage);
    }

    // Parse the already-read text
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      warnAboutFunction();
      return [];
    }

    const reviews = (data.reviews || []).map((review) => {
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
        url: null,
      };
    });

    return reviews;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching reviews:', error.message);
    }
    return [];
  }
}
