export const IOS_APP_STORE_URL =
  "https://apps.apple.com/us/app/litchfield-perk/id6747682541";

export const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=co.frostbyte.litchfieldperk&pcampaignid=web_share";

export function detectDevicePlatform() {
  if (typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent || navigator.vendor || window.opera;

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) return "ios";
  if (/Android/i.test(ua)) return "android";

  return "desktop";
}

export function getAppStoreUrlForDevice() {
  const platform = detectDevicePlatform();

  if (platform === "ios") return IOS_APP_STORE_URL;
  if (platform === "android") return ANDROID_PLAY_STORE_URL;

  return null;
}

function detectPlatformFromUrl(url) {
  if (!url) return "android"; // Safe fallback

  if (
    url.includes("apps.apple.com") ||
    url.includes("itunes.apple.com")
  ) {
    return "ios";
  }

  if (url.includes("play.google.com")) {
    return "android";
  }

  return "android";
}

export function trackAppStoreClick(placement, url) {
  try {
    const platform = detectPlatformFromUrl(url);
    const eventName = "app_store_click";

    const eventPayload = {
      platform,
      placement,
      url,
    };

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, eventPayload);
    }

    if (typeof window !== "undefined" && window.plausible) {
      window.plausible(eventName, {
        props: eventPayload,
      });
    }

    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track(eventName, eventPayload);
    }
  } catch {
  }
}
