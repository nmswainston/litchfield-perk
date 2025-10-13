export default async (req, context) => {
  const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=43200", // 12h
  };

  // Fallback data if env is missing
  const fallback = {
    rating: 5,
    totalReviews: 5,
    reviews: [
      {
        id: 1,
        name: "Community Member",
        rating: 5,
        text: "Great coffee and friendly staff!",
        date: "Recently",
        source: "Google",
      },
    ],
  };

  if (!GOOGLE_PLACE_ID || !GOOGLE_API_KEY) {
    return new Response(JSON.stringify(fallback), { status: 200, headers });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google API HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== "OK") throw new Error(`Google API ${data.status}`);

    const body = {
      rating: data.result?.rating || 0,
      totalReviews: data.result?.user_ratings_total || 0,
      reviews: (data.result?.reviews || []).map((r) => ({
        id: r.time,
        name: r.author_name,
        rating: r.rating,
        text: r.text,
        date: r.relative_time_description || "Recently",
        source: "Google",
      })),
    };

    return new Response(JSON.stringify(body), { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify(fallback), { status: 200, headers });
  }
};

