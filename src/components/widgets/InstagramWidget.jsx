import { useState, useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "../../constants/business";

export default function InstagramWidget({ cardClassName = "" }) {
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (iframeRef.current) {
        try {
          const iframe = iframeRef.current;
          if (!iframe.contentWindow) setIframeError(true);
        } catch {
          setIframeError(true);
        }
      }
    }, 3000);

    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const handleIframeLoad = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setIframeError(false);
  };

  const handleIframeError = () => setIframeError(true);

  if (iframeError) {
    return (
      <div className={`w-full ${cardClassName}`}>
        <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-xl ring-1 ring-brand-border bg-brand-background">
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
      <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-xl ring-1 ring-brand-border bg-brand-background">
        {/* Aspect-ratio wrapper keeps SnapWidget looking right at any width */}
        <div
          className="
            relative w-full overflow-hidden
            aspect-[3/2]
            min-h-[320px]
            sm:min-h-[420px]
            lg:min-h-[520px]
          "
        >
          <iframe
            ref={iframeRef}
            src="https://snapwidget.com/embed/1115439"
            className="absolute inset-0 w-full h-full block border-0"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
            title="Posts from Instagram"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
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
