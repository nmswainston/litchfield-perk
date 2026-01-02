/**
 * Formatting Utility Functions
 * 
 * Collection of utility functions for formatting time and business hours.
 */

/**
 * Format 24-hour time string to 12-hour format with AM/PM
 * @param {string} time - Time string in HH:MM format
 * @returns {string} Formatted time string (e.g., "9:30 AM")
 */
export function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Get today's day name (e.g., "Monday", "Tuesday", etc.)
 * @returns {string} Day name
 */
function getTodayDayName() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  return days[today.getDay()];
}

/**
 * Get today's operating hours based on business hours configuration
 * @param {Object} hours - Business hours configuration object
 * @returns {string} Formatted hours string for today (e.g., "7:00 AM–2:00 PM" or "Closed")
 */
export function getTodayHours(hours) {
  const todayDayName = getTodayDayName();
  
  // Check if Sunday (closed)
  if (hours.sunday?.closed && todayDayName === "Sunday") {
    return 'Closed';
  }
  
  // Check each group's days array to find a match
  for (const [key, group] of Object.entries(hours)) {
    if (key === 'sunday') continue; // Already handled
    
    if (group.days && Array.isArray(group.days) && group.days.includes(todayDayName)) {
      const open = formatTime(group.open);
      const close = formatTime(group.close);
      return `${open}–${close}`;
    }
  }
  
  return 'Closed';
}