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
        className="display-hero text-brand-text font-semibold md:text-[clamp(2rem,4.5vw,3.25rem)] lg:text-[clamp(2.25rem,5vw,3.75rem)]"
      >
        Welcome
        <span className="block mt-1 sm:mt-1.5 lg:mt-1 text-[clamp(1.125rem,3vw,1.875rem)] md:text-[clamp(1.375rem,3.5vw,2.25rem)] lg:text-[clamp(1.625rem,4vw,2.5rem)] font-semibold leading-[1.2] tracking-[0.02em]">
          to
        </span>
      </h1>

      <img
        src={logoImage}
        alt={HERO_LOGO_ALT}
        width={320}
        height={320}
        className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] max-w-full h-auto drop-shadow-md"
        loading="eager"
      />

      <p className="text-base sm:text-lg md:text-xl lg:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed px-4 [text-wrap:balance]">
        The One Where You Get <span className="whitespace-nowrap">Great Coffee.</span>
      </p>

      <div className="w-full px-4 mt-2 sm:mt-3 md:mt-4">
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
