/**
 * Scroll utility functions
 */

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Offset from top (default: 80)
 */
export function scrollToElement(elementId, offset = 80) {
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
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean} Whether element is visible
 */
export function isInViewport(element, threshold = 0.1) {
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
 * Get scroll progress for an element
 * @param {Element} element - DOM element
 * @returns {number} Scroll progress (0-1)
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
