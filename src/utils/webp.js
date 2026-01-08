/**
 * Detects WebP support by attempting to load a tiny WebP image.
 * Sets a class on the document root (.webp or .no-webp) for CSS targeting.
 * 
 * This is more reliable than CSS @supports rules which don't actually
 * test image format decoding support.
 */
let webpSupported = null;
let detectionPromise = null;

/**
 * Detects WebP support and sets a class on the document
 * @returns {Promise<boolean>} Promise that resolves to true if WebP is supported
 */
export function detectWebPSupport() {
  // Return cached result if already detected
  if (webpSupported !== null) {
    return Promise.resolve(webpSupported);
  }

  // Return existing promise if detection is in progress
  if (detectionPromise) {
    return detectionPromise;
  }

  // Create a new detection promise
  detectionPromise = new Promise((resolve) => {
    const webp = new Image();
    let isSupported;
    
    webp.onload = () => {
      // If the image loaded successfully and has dimensions, WebP is supported
      isSupported = webp.width > 0 && webp.height > 0;
      webpSupported = isSupported;
      
      // Set class on document root for CSS targeting
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add(isSupported ? 'webp' : 'no-webp');
        document.documentElement.classList.remove(isSupported ? 'no-webp' : 'webp');
      }
      
      resolve(isSupported);
    };
    
    webp.onerror = () => {
      // If the image failed to load, WebP is not supported
      isSupported = false;
      webpSupported = false;
      
      // Set class on document root for CSS targeting
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('no-webp');
        document.documentElement.classList.remove('webp');
      }
      
      resolve(false);
    };

    // Load a tiny WebP test image (data URI)
    // This is a valid 1x1 transparent WebP image - if it loads, WebP is supported
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });

  return detectionPromise;
}

/**
 * Gets the cached WebP support status (synchronous)
 * Returns null if detection hasn't completed yet
 * @returns {boolean|null}
 */
export function getWebPSupport() {
  return webpSupported;
}

/**
 * Initializes WebP detection immediately (call this early in app lifecycle)
 */
export function initWebPDetection() {
  if (typeof window !== 'undefined' && webpSupported === null) {
    detectWebPSupport();
  }
}

