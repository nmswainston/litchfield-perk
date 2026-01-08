export default async (req, context) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey) {
      return json(500, { error: "Missing GOOGLE_PLACES_API_KEY env var" });
    }
    if (!placeId) {
      return json(500, { error: "Missing GOOGLE_PLACE_ID env var" });
    }

    // Places API (New) endpoint
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

    // Ask only for what you need (saves quota and reduces payload)
    const fieldMask = [
      "displayName",
      "rating",
      "userRatingCount",
      "reviews.rating",
      "reviews.text.text",
      "reviews.relativePublishTimeDescription",
      "reviews.authorAttribution.displayName",
      "reviews.authorAttribution.photoUri",
      "reviews.authorAttribution.uri",
    ].join(",");

    const resp = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
      },
    });

    const data = await resp.json();

    if (!resp.ok) {
      // Bubble up the real Google error so you stop flying blind
      return json(resp.status, {
        error: "Google Places API error",
        details: data,
      });
    }

    // Optional: Normalize payload for your frontend
    const reviews = Array.isArray(data.reviews) ? data.reviews : [];

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // Cache at the edge. Reviews don't change often.
        "Cache-Control": "public, max-age=0, s-maxage=21600", // 6 hours
      },
      body: JSON.stringify({
        name: data?.displayName?.text ?? null,
        rating: data?.rating ?? null,
        userRatingCount: data?.userRatingCount ?? null,
        reviews: reviews.map((r) => ({
          author: r?.authorAttribution?.displayName ?? null,
          authorUrl: r?.authorAttribution?.uri ?? null,
          authorPhoto: r?.authorAttribution?.photoUri ?? null,
          rating: r?.rating ?? null,
          relativeTime: r?.relativePublishTimeDescription ?? null,
          text: r?.text?.text ?? "",
        })),
      }),
    };
  } catch (err) {
    return json(500, { error: "Function crashed", details: String(err) });
  }
};

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(obj),
  };
}
