/**
 * Reviews Utility Functions
 * 
 * Handles Google Reviews API integration with fallback to static reviews.
 * Provides functions for fetching, transforming, and formatting review data.
 */

// Google My Business API configuration
// Note: Replace with actual credentials when ready to use Google API
export const GOOGLE_PLACE_ID = "ChIJ..."; // Replace with actual Place ID
export const GOOGLE_API_KEY = "YOUR_API_KEY"; // Replace with actual API key
export const ENABLE_GOOGLE_API = false; // Set to true to enable API calls

// Time constants for date formatting
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 30;
const DAYS_PER_YEAR = 365;

/**
 * Fetch reviews from Google My Business API
 * @returns {Promise<Array>} Array of review objects
 */
export async function fetchGoogleReviews() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google API error: ${data.status}`);
    }
    
    return {
      reviews: data.result.reviews || [],
      rating: data.result.rating || 0,
      totalReviews: data.result.user_ratings_total || 0
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching Google reviews:', error);
    }
    return {
      reviews: [],
      rating: 0,
      totalReviews: 0
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
    name: googleReview.author_name || 'Anonymous',
    rating: googleReview.rating || 5,
    text: googleReview.text || '',
    avatar: generateAvatar(googleReview.author_name),
    date: formatGoogleDate(googleReview.time),
    source: 'Google'
  };
}

/**
 * Generate avatar initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
function generateAvatar(name) {
  if (!name) return 'A';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

/**
 * Format Google timestamp to human-readable relative date
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted relative date string
 */
function formatGoogleDate(timestamp) {
  if (!timestamp) return 'Recently';
  
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / MILLISECONDS_PER_DAY);
  
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < DAYS_PER_WEEK) return `${diffDays} days ago`;
  if (diffDays < DAYS_PER_MONTH) return `${Math.ceil(diffDays / DAYS_PER_WEEK)} weeks ago`;
  if (diffDays < DAYS_PER_YEAR) return `${Math.ceil(diffDays / DAYS_PER_MONTH)} months ago`;
  return `${Math.ceil(diffDays / DAYS_PER_YEAR)} years ago`;
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
    source: "Google"
  },
  {
    id: 2,
    name: "Skylar W.",
    rating: 5,
    text: "My boyfriend and I visited Litchfield Perk, and the cold brew here quickly moved into his top 3 in the state. Personally, I loved the added touch of the chocolate espresso bean with the drink, and the pastries here are the best I've ever had.",
    avatar: "SW",
    date: "1 month ago",
    source: "Google"
  },
  {
    id: 3,
    name: "Michael R.",
    rating: 5,
    text: "Amazing coffee and atmosphere! The baristas are friendly and the pastries are fresh. Perfect spot to work or catch up with friends. Highly recommend the Central Perk Special!",
    avatar: "MR",
    date: "3 weeks ago",
    source: "Google"
  },
  {
    id: 4,
    name: "Sarah L.",
    rating: 5,
    text: "Best coffee in Litchfield Park! The cold brew is smooth and the specialty drinks are creative. The staff remembers your order and makes you feel like family. Love this place!",
    avatar: "SL",
    date: "1 week ago",
    source: "Google"
  },
  {
    id: 5,
    name: "David K.",
    rating: 5,
    text: "Great coffee, great vibes! The botanical pattern and cozy seating make it the perfect place to relax. The menu has something for everyone and the quality is consistently excellent.",
    avatar: "DK",
    date: "2 weeks ago",
    source: "Google"
  }
];

/**
 * Get reviews with automatic fallback to static data
 * Attempts to fetch from Google API if enabled, otherwise returns fallback reviews
 * 
 * @returns {Promise<Array>} Array of review objects
 */
export async function getReviews() {
  // Use fallback if API is disabled or credentials are not configured
  const shouldUseFallback = !ENABLE_GOOGLE_API || 
                          GOOGLE_API_KEY === "YOUR_API_KEY" || 
                          GOOGLE_PLACE_ID === "ChIJ...";
  
  if (shouldUseFallback) {
    return fallbackReviews;
  }

  try {
    const googleData = await fetchGoogleReviews();
    
    if (googleData.reviews && googleData.reviews.length > 0) {
      return googleData.reviews.map(transformGoogleReview);
    }
    
    return fallbackReviews;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching reviews from Google API:', error);
    }
    return fallbackReviews;
  }
}
