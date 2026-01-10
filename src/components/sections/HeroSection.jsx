import { useState } from "react";
import { Button, HeroShell } from "../ui";
import analytics from "../../utils/analytics";
import logoImage from "../../assets/logo-512.png";
import {
  trackAppStoreClick,
  getAppStoreUrlForDevice,
  IOS_APP_STORE_URL,
  ANDROID_PLAY_STORE_URL,
} from "../../utils/appStore";

const HERO_LOGO_ALT =
  "Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience";

const SHOPIFY_STORE_URL = "https://litchfield-perk-coffee-co.myshopify.com/";

export default function HeroSection() {
  const [showAppChooser, setShowAppChooser] = useState(false);

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleGetAppClick = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const url = getAppStoreUrlForDevice();

    analytics.trackCTAClick("app", "hero");

    if (url) {
      trackAppStoreClick("hero", url);
      openExternal(url);
      return;
    }

    setShowAppChooser(true);
  };

  const closeChooser = () => setShowAppChooser(false);

  return (
    <HeroShell
      id="main-content"
      className="bg-brand-background text-center p-0"
      aria-labelledby="hero-heading"
    >
      <h1
        id="hero-heading"
        className="display-hero text-brand-text font-semibold md:text-[clamp(2rem,5vw,3.5rem)] lg:text-[clamp(2.25rem,5.5vw,4rem)]"
      >
        Welcome
        <span className="block mt-1.5 sm:mt-2 lg:mt-1 text-[clamp(1.25rem,3.5vw,2rem)] md:text-[clamp(1.5rem,4vw,2.5rem)] lg:text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[0.02em]">
          to
        </span>
      </h1>

      <img
        src={logoImage}
        alt={HERO_LOGO_ALT}
        width={320}
        height={320}
        className="h-40 max-h-[180px] sm:h-56 sm:max-h-none md:h-[340px] lg:h-[320px] w-auto drop-shadow-md"
        loading="eager"
      />

      <p className="text-lg sm:text-xl md:text-xl lg:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed px-4">
        The One Where You Get Great Coffee.
      </p>

      <div className="w-full px-4 mt-6 sm:mt-5 md:mt-3 lg:mt-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-4 max-w-2xl mx-auto">
          <Button
            href="#"
            variant="filled"
            size="lg"
            onClick={handleGetAppClick}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-2.5 sm:py-3.5 h-[48px] sm:h-auto rounded-xl sm:rounded-lg"
            aria-label="Get the Litchfield Perk app"
          >
            Get the App
          </Button>

          <Button
            href="#menu"
            variant="secondary"
            size="lg"
            onClick={() => analytics.trackCTAClick("menu", "hero")}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-2.5 sm:py-3.5 h-[44px] sm:h-auto rounded-xl sm:rounded-lg mt-4 sm:mt-0"
            aria-label="Browse our menu - View coffee, food, and specialty drinks"
          >
            Menu
          </Button>

          <Button
            href={SHOPIFY_STORE_URL}
            variant="secondary"
            size="lg"
            onClick={() => analytics.trackCTAClick("store", "hero")}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-2.5 sm:py-3.5 h-[44px] sm:h-auto rounded-xl sm:rounded-lg mt-2 sm:mt-0"
            aria-label="Visit our online store"
            target="_blank"
            rel="noopener noreferrer"
          >
            Store
          </Button>
        </div>
      </div>

      {showAppChooser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your app store"
          onClick={closeChooser}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-brand-background p-5 shadow-xl text-left"
            onClick={(evt) => evt.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-brand-text">Get the App</h2>
            <p className="mt-2 text-brand-text/80">Choose your app store:</p>

            <div className="mt-4 flex flex-col gap-3">
              <Button
                href={IOS_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="filled"
                size="lg"
                onClick={() => {
                  trackAppStoreClick("hero-desktop-chooser", IOS_APP_STORE_URL);
                  analytics.trackCTAClick("app_ios", "hero_desktop_chooser");
                  closeChooser();
                }}
              >
                App Store (iPhone/iPad)
              </Button>

              <Button
                href={ANDROID_PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="filled"
                size="lg"
                onClick={() => {
                  trackAppStoreClick("hero-desktop-chooser", ANDROID_PLAY_STORE_URL);
                  analytics.trackCTAClick("app_android", "hero_desktop_chooser");
                  closeChooser();
                }}
              >
                Google Play (Android)
              </Button>
            </div>
          </div>
        </div>
      )}
    </HeroShell>
  );
}
