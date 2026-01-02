import { useState, useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "../../constants/business";

export default function InstagramWidget({ cardClassName = "" }) {
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Set a timeout to detect if iframe fails to load (e.g., CSP blocking, iOS Safari restrictions)
    timeoutRef.current = setTimeout(() => {
      if (iframeRef.current) {
        try {
          // Try to access iframe content - will fail if blocked by CSP or cross-origin restrictions
          const iframe = iframeRef.current;
          // If we can't access contentWindow, it's likely blocked
          if (!iframe.contentWindow) {
            setIframeError(true);
          }
        } catch {
          // Cross-origin or CSP blocking detected
          setIframeError(true);
        }
      }
    }, 3000); // 3 second timeout

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    // If iframe loads successfully, clear timeout and reset error state
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  if (iframeError) {
    // Fallback UI when iframe fails to load
    return (
      <div className={`w-full ${cardClassName}`}>
        <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl ring-1 ring-brand-border bg-brand-background">
          <div className="p-8 sm:p-12 text-center">
            <Instagram className="w-12 h-12 mx-auto mb-4 text-brand-600" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2 text-brand-text">View Our Instagram</h3>
            <p className="text-brand-text-muted mb-6">
              Follow us on Instagram to see our latest posts, specials, and behind-the-scenes moments.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
              Follow @litchfieldperk
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${cardClassName}`}>
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl ring-1 ring-brand-border bg-brand-background">
        <iframe
          ref={iframeRef}
          src="https://snapwidget.com/embed/1115439"
          className="snapwidget-widget block w-full border-0 overflow-hidden
                     h-[clamp(210px,36vh,270px)]
                     sm:h-[clamp(300px,42vh,380px)]
                     md:h-[clamp(380px,40vh,460px)]
                     lg:h-[640px]
                     xl:h-[720px]"
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          title="Posts from Instagram"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>

      <p className="mt-3 text-center text-sm text-brand-text-muted">
        Having trouble viewing the feed?{" "}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-brand-600"
        >
          View on Instagram
        </a>
      </p>
    </div>
  );
}
