/**
 * Scroll Utility Functions
 * 
 * Collection of utility functions for smooth scrolling and viewport detection.
 */

// Constants
const DEFAULT_SCROLL_OFFSET = 80; // Default offset for scroll positioning
const DEFAULT_VISIBILITY_THRESHOLD = 0.1; // 10% visibility threshold

/**
 * Smoothly scroll to an element by ID with optional offset
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Pixel offset from top (default: 80)
 */
export function scrollToElement(elementId, offset = DEFAULT_SCROLL_OFFSET) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

/**
 * Check if element is visible in viewport
 * @param {Element} element - DOM element to check
 * @param {number} threshold - Visibility threshold 0-1 (default: 0.1)
 * @returns {boolean} True if element is visible within threshold
 */
export function isInViewport(element, threshold = DEFAULT_VISIBILITY_THRESHOLD) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalVisible =
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold;
  const horizontalVisible = rect.left <= windowWidth && rect.right >= 0;

  return verticalVisible && horizontalVisible;
}

/**
 * Calculate scroll progress through an element (0-1)
 * @param {Element} element - DOM element to track
 * @returns {number} Scroll progress value between 0 and 1
 */
export function getScrollProgress(element) {
  if (!element) return 0;

  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const elementTop = rect.top + window.scrollY;
  const elementHeight = rect.height;
  const scrollY = window.scrollY;

  const progress = Math.max(
    0,
    Math.min(
      1,
      (scrollY - elementTop + windowHeight) / (elementHeight + windowHeight),
    ),
  );

  return progress;
}
