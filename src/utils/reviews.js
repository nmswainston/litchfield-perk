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
      try {
        const errorData = JSON.parse(text);
        if (errorData.error_message) {
          errorMessage = errorData.error_message;
        }
      } catch {
        // If parsing fails, use default error message
      }
      
      if (response.status === 502 && import.meta.env.DEV) {
        console.error('Netlify function error (502):', errorMessage);
      } else {
        console.error('Error fetching reviews:', errorMessage);
      }
      
      throw new Error(errorMessage);
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
