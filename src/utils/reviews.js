/**
 * Reviews utility functions for Google Reviews integration
 */

// Google My Business API integration
// Note: These are placeholder values. Replace with actual credentials when ready to use Google API
export const GOOGLE_PLACE_ID = "ChIJ..."; // Replace with actual Place ID
export const GOOGLE_API_KEY = "YOUR_API_KEY"; // Replace with actual API key

// Flag to enable/disable Google API calls (set to false to use fallback data)
export const ENABLE_GOOGLE_API = false;

/**
 * Fetch reviews from Google My Business API
 * @returns {Promise<Array>} Array of review objects
 */
export async function fetchGoogleReviews() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google API error: ${data.status}`);
    }

    return {
      reviews: data.result.reviews || [],
      rating: data.result.rating || 0,
      totalReviews: data.result.user_ratings_total || 0,
    };
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return {
      reviews: [],
      rating: 0,
      totalReviews: 0,
    };
  }
}

/**
 * Transform Google review data to our format
 * @param {Object} googleReview - Google review object
 * @returns {Object} Transformed review object
 */
export function transformGoogleReview(googleReview) {
  return {
    id: googleReview.time || Date.now(),
    name: googleReview.author_name || "Anonymous",
    rating: googleReview.rating || 5,
    text: googleReview.text || "",
    avatar: generateAvatar(googleReview.author_name),
    date: formatGoogleDate(googleReview.time),
    source: "Google",
  };
}

/**
 * Generate avatar initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
function generateAvatar(name) {
  if (!name) return "A";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
}

/**
 * Format Google timestamp to readable date
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date
 */
function formatGoogleDate(timestamp) {
  if (!timestamp) return "Recently";

  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
}

/**
 * Fallback reviews data (used when API fails)
 */
export const fallbackReviews = [
  {
    id: 1,
    name: "Alexandria A.",
    rating: 5,
    text: "First time trying. Will definitely be back. Tried one of their cold brew and their specialty latte. Both were super good. I'm always hesitant to try new coffee because I like my coffee to actually taste like coffee, not sugary milk. I was very pleased and highly recommend it.",
    avatar: "AA",
    date: "2 weeks ago",
    source: "Google",
  },
  {
    id: 2,
    name: "Skylar W.",
    rating: 5,
    text: "My boyfriend and I visited Litchfield Perk, and the cold brew here quickly moved into his top 3 in the state. Personally, I loved the added touch of the chocolate espresso bean with the drink, and the pastries here are the best I've ever had.",
    avatar: "SW",
    date: "1 month ago",
    source: "Google",
  },
  {
    id: 3,
    name: "Michael R.",
    rating: 5,
    text: "Amazing coffee and atmosphere! The baristas are friendly and the pastries are fresh. Perfect spot to work or catch up with friends. Highly recommend the Central Perk Special!",
    avatar: "MR",
    date: "3 weeks ago",
    source: "Google",
  },
  {
    id: 4,
    name: "Sarah L.",
    rating: 5,
    text: "Best coffee in Litchfield Park! The cold brew is smooth and the specialty drinks are creative. The staff remembers your order and makes you feel like family. Love this place!",
    avatar: "SL",
    date: "1 week ago",
    source: "Google",
  },
  {
    id: 5,
    name: "David K.",
    rating: 5,
    text: "Great coffee, great vibes! The botanical pattern and cozy seating make it the perfect place to relax. The menu has something for everyone and the quality is consistently excellent.",
    avatar: "DK",
    date: "2 weeks ago",
    source: "Google",
  },
];

/**
 * Get reviews with fallback
 * @returns {Promise<Array>} Array of reviews
 */
export async function getReviews() {
  try {
    // Prefer serverless cached endpoint when available
    const res = await fetch("/.netlify/functions/reviews?rating=5&limit=10", {
      headers: { "Accept": "application/json" },
    });
    if (res.ok) {
      const payload = await res.json();
      if (Array.isArray(payload.reviews) && payload.reviews.length) {
        // Ensure avatar initials are always present
        return payload.reviews.map((review) => ({
          ...review,
          avatar: review.avatar || generateAvatar(review.name),
        }));
      }
    }
  } catch {}

  // Fallback to client Google API (disabled by default), then static data
  if (
    ENABLE_GOOGLE_API &&
    GOOGLE_API_KEY !== "YOUR_API_KEY" &&
    GOOGLE_PLACE_ID !== "ChIJ..."
  ) {
    try {
      const googleData = await fetchGoogleReviews();
      if (googleData.reviews.length > 0) {
        return googleData.reviews.map(transformGoogleReview);
      }
    } catch {}
  }

  return fallbackReviews;
}
