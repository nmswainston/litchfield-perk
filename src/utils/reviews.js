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
    if (!contentType.includes('application/json')) {
      warnAboutFunction();
      return [];
    }

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const text = await response.text();
        if (isHtmlResponse(text)) {
          warnAboutFunction();
          return [];
        }
        const errorData = JSON.parse(text);
        if (errorData.error_message) {
          errorMessage = errorData.error_message;
        }
      } catch {
      }
      
      if (response.status === 502 && import.meta.env.DEV) {
        console.error('Netlify function error (502):', errorMessage);
      } else {
        console.error('Error fetching reviews:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    let data;
    try {
      const text = await response.text();
      if (isHtmlResponse(text)) {
        warnAboutFunction();
        return [];
      }
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
