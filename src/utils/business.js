import { BUSINESS_INFO } from '../constants/business';

/**
 * Format time from 24-hour format (HH:MM) to 12-hour format with AM/PM
 * @param {string} time24 - Time in 24-hour format (e.g., "14:30")
 * @returns {string} - Formatted time (e.g., "2:30p")
 */
export function formatBusinessTime(time24) {
  if (!time24) return '';
  
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'p' : 'a';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const displayMinutes = minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
  
  return `${displayHours}${displayMinutes}${period}`;
}

/**
 * Get current day of week as string
 * @returns {string} - Day name (e.g., "Monday", "Tuesday", etc.)
 */
export function getCurrentDay() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
}

/**
 * Get current time in HH:MM format
 * @returns {string} - Current time in 24-hour format
 */
export function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // Gets HH:MM format
}

/**
 * Check if current time is within business hours
 * @returns {object} - Object with isOpen boolean and current hours info
 */
export function getBusinessStatus() {
  const currentDay = getCurrentDay();
  const currentTime = getCurrentTime();
  const hours = BUSINESS_INFO.hours;
  
  // Check if it's Sunday (closed)
  if (currentDay === 'Sunday') {
    return {
      isOpen: false,
      todayHours: 'Closed',
      nextOpen: getNextOpenTime(),
      currentTime: formatBusinessTime(currentTime)
    };
  }
  
  // Check if it's Saturday
  if (currentDay === 'Saturday') {
    const isOpen = isTimeInRange(currentTime, hours.saturday.open, hours.saturday.close);
    return {
      isOpen,
      todayHours: `Open today ${formatBusinessTime(hours.saturday.open)}–${formatBusinessTime(hours.saturday.close)}`,
      nextOpen: isOpen ? null : getNextOpenTime(),
      currentTime: formatBusinessTime(currentTime)
    };
  }
  
  // Weekdays (Monday-Friday)
  const isOpen = isTimeInRange(currentTime, hours.weekdays.open, hours.weekdays.close);
  return {
    isOpen,
    todayHours: `Open today ${formatBusinessTime(hours.weekdays.open)}–${formatBusinessTime(hours.weekdays.close)}`,
    nextOpen: isOpen ? null : getNextOpenTime(),
    currentTime: formatBusinessTime(currentTime)
  };
}

/**
 * Check if current time is within given range
 * @param {string} currentTime - Current time in HH:MM format
 * @param {string} openTime - Opening time in HH:MM format
 * @param {string} closeTime - Closing time in HH:MM format
 * @returns {boolean} - True if current time is within business hours
 */
function isTimeInRange(currentTime, openTime, closeTime) {
  const current = timeToMinutes(currentTime);
  const open = timeToMinutes(openTime);
  const close = timeToMinutes(closeTime);
  
  return current >= open && current < close;
}

/**
 * Convert time string to minutes since midnight
 * @param {string} time - Time in HH:MM format
 * @returns {number} - Minutes since midnight
 */
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Get next opening time
 * @returns {string} - Next opening time description
 */
function getNextOpenTime() {
  const currentDay = getCurrentDay();
  const hours = BUSINESS_INFO.hours;
  
  if (currentDay === 'Sunday') {
    return `Reopens Monday at ${formatBusinessTime(hours.weekdays.open)}`;
  }
  
  if (currentDay === 'Saturday') {
    const currentTime = getCurrentTime();
    if (isTimeInRange(currentTime, hours.saturday.open, hours.saturday.close)) {
      return null; // Currently open
    }
    return `Reopens Monday at ${formatBusinessTime(hours.weekdays.open)}`;
  }
  
  // Weekdays
  const currentTime = getCurrentTime();
  if (isTimeInRange(currentTime, hours.weekdays.open, hours.weekdays.close)) {
    return null; // Currently open
  }
  
  // Check if it's before opening time today
  if (timeToMinutes(currentTime) < timeToMinutes(hours.weekdays.open)) {
    return `Opens today at ${formatBusinessTime(hours.weekdays.open)}`;
  }
  
  // Check if it's after closing time
  if (timeToMinutes(currentTime) >= timeToMinutes(hours.weekdays.close)) {
    if (currentDay === 'Friday') {
      return `Reopens Saturday at ${formatBusinessTime(hours.saturday.open)}`;
    }
    return `Reopens tomorrow at ${formatBusinessTime(hours.weekdays.open)}`;
  }
  
  return null;
}
