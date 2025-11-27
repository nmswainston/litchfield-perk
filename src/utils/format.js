/**
 * Formatting Utility Functions
 * 
 * Collection of utility functions for formatting various data types
 * including currency, phone numbers, time, and text truncation.
 */

/**
 * Format currency amount to locale-specific string
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

/**
 * Format phone number to (XXX) XXX-XXXX format
 * @param {string} phone - Phone number string
 * @returns {string} Formatted phone number
 */
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

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
 * Truncate text to specified length with optional suffix
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum character length
 * @param {string} suffix - Suffix to append (default: '...')
 * @returns {string} Truncated text with suffix if needed
 */
export function truncateText(text, maxLength, suffix = "...") {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
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