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
function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Get today's operating hours based on business hours configuration
 * @param {Object} hours - Business hours configuration object
 * @returns {string} Formatted hours string for today (e.g., "7:00 AM–2:00 PM" or "Closed")
 */
export function getTodayHours(hours) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  
  if (dayOfWeek === 0 && hours.sunday?.closed) {
    return 'Closed';
  }
  
  if (dayOfWeek === 6) {
    // Saturday
    const open = formatTime(hours.saturday.open);
    const close = formatTime(hours.saturday.close);
    return `${open}–${close}`;
  }
  
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Monday - Friday
    const open = formatTime(hours.weekdays.open);
    const close = formatTime(hours.weekdays.close);
    return `${open}–${close}`;
  }
  
  return 'Closed';
}