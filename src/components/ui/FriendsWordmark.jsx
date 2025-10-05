import React from "react";

/**
 * <FriendsWordmark>
 * A reusable Friends‑style arched wordmark with real SVG dots between letters.
 *
 * Props
 * - text: string (default "WELCOME")
 * - width: number | string (default 600)
 * - height: number | string (default 220)
 * - radius: number (default 360)  // arc radius in SVG units
 * - startAngle: number (default -160) // degrees, left end of arc
 * - endAngle: number (default -20)    // degrees, right end of arc
 * - letterSize: number (default 72)   // font-size in px
 * - letterSpacing: number (default 2) // tracking in px added per letter
 * - dotScale: number (default 1)      // 1 = auto size; scales circle radius
 * - dotColors: string[] (default ["var(--color-accent-cobalt)", "var(--color-accent-tomato)", "var(--color-accent-mustard)"]) // blue, red, yellow
 * - stroke: boolean | string (default true)
 *     - true: uses subtle off‑white stroke color
 *     - false: no stroke
 *     - string: custom stroke color
 * - strokeWidth: number (default 1)
 * - dropShadow: boolean (default true)
 * - className: string (optional)
 * - style: React.CSSProperties (optional)
 *
 * Notes
 * - Uses positioned <text> elements along a circular arc so we can interleave real <circle> dots.
 * - Adds a super‑subtle off‑white text stroke and optional soft drop shadow to mimic painted signage.
 */

function degToRad(d) { return (d * Math.PI) / 180; }

function polarToCartesian(cx, cy, r, angleDeg) {
  const a = degToRad(angleDeg);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function lerp(a, b, t) { return a + (b - a) * t; }

function getSamples(count, startAngle, endAngle) {
  // Evenly spaced inclusive samples from startAngle..endAngle
  const out = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    out.push(lerp(startAngle, endAngle, t));
  }
  return out;
}

function AutoDefs({ enableShadow, filterId }) {
  return (
    <defs>
      {enableShadow && (
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodOpacity="0.2" />
        </filter>
      )}
      {/* Expose the id through CSS var on <g data-shadow> so we can reference it inline */}
      <style>{`
        /* Allow consumers to tweak via CSS if desired */
        .friends-wordmark text { paint-order: stroke fill; }
      `}</style>
    </defs>
  );
}

const FriendsWordmark = ({
  text = "WELCOME",
  size,
  width = 600,
  height = 220,
  radius = 360,
  startAngle = -150,
  endAngle = -30,
  letterSize = 72,
  letterSpacing = 2,
  dotScale = 1,
  dotColors = ["var(--color-accent-cobalt)", "var(--color-accent-tomato)", "var(--color-accent-mustard)"],
  stroke = true,
  strokeWidth = 1,
  dropShadow = true,
  className,
  style,
}) => {
  const safe = (text || "").toUpperCase();
  const letters = [...safe];
  const n = letters.length;
  const shadowId = React.useId();

  // Resolve size → width/height/radius/letterSize for a simple API
  let w = typeof width === "number" ? width : 600;
  let h = typeof height === "number" ? height : 220;
  let r = radius;
  let fs = letterSize;
  if (typeof size === "number" && Number.isFinite(size)) {
    w = size;
    h = Math.round(size * 0.42);
    r = Math.round(size * 0.36);
    fs = Math.round(size * 0.14);
  }
  // Canvas coords: center at (width/2, height*0.9) so the arc sits near the top.
  const cx = w / 2;
  const cy = h * 0.78; // place baseline lower so arc crowns visually centered

  // Sample angles for letters and for dots (midpoints between letters)
  const letterAngles = getSamples(n, startAngle, endAngle);
  const dotAngles = getSamples(Math.max(n - 1, 0), startAngle, endAngle).map((a, i) =>
    // Place dots midway between successive letter angles
    (letterAngles[i] + letterAngles[i + 1]) / 2
  ).slice(0, Math.max(n - 1, 0));

  // Auto circle size based on letterSize and radius curvature
  const baseDotR = Math.max(2, Math.min(8, (fs * 0.14)));
  const dotR = baseDotR * dotScale;

  // Text style: subtle off‑white stroke + soft drop shadow
  const textStyle = {
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 700,
  };

  // Build a gentle arc path for reference/optional debug (not displayed)
  const arcPath = (() => {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  })();

  const svgRef = React.useRef(null);
  const defaultStrokeColor = "var(--color-brand-background-light)";
  const resolvedStroke = typeof stroke === "boolean" ? (stroke ? defaultStrokeColor : "none") : (stroke || "none");
  const resolvedStrokeWidth = resolvedStroke === "none" ? 0 : strokeWidth;

  return (
    <svg
      ref={svgRef}
      className={["friends-wordmark", className].filter(Boolean).join(" ")}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`${safe} wordmark, Friends style with colored dots`}
      style={style}
    >
      <AutoDefs enableShadow={dropShadow} filterId={shadowId} />

      {/* Letterforms along arc */}
      <g
        data-shadow
        style={dropShadow ? { filter: `url(#${shadowId})` } : undefined}
      >
        {letters.map((ch, i) => {
          const ang = letterAngles[i];
          const pos = polarToCartesian(cx, cy, r, ang);
          // Tangent rotation so letters sit on arc
          const rotate = ang + 90; // baseline perpendicular to radius
          return (
            <text
              key={`letter-${i}-${ch}`}
              x={pos.x}
              y={pos.y}
              fontSize={fs}
              textAnchor="middle"
              dominantBaseline="alphabetic"
              transform={`rotate(${rotate} ${pos.x} ${pos.y})`}
              fill="currentColor"
              stroke={resolvedStroke}
              strokeWidth={resolvedStrokeWidth}
              style={{ ...textStyle, letterSpacing }}
            >
              {ch}
            </text>
          );
        })}

        {/* Dots between letters (ornamental only) */}
        <g aria-hidden="true" role="presentation">
          {dotAngles.map((ang, i) => {
            const pos = polarToCartesian(cx, cy, r, ang);
            const fill = dotColors[i % dotColors.length] ?? dotColors[0];
            return (
              <circle
                key={`dot-${i}`}
                cx={pos.x}
                cy={pos.y - fs * 0.12}
                r={dotR}
                fill={fill}
              />
            );
          })}
        </g>
      </g>

      {/* Small centered TO below */}
      <text
        x={cx}
        y={h * 0.92}
        fontSize={Math.round(fs * 0.46)}
        letterSpacing={6}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        stroke={resolvedStroke}
        strokeWidth={Math.max(1, Math.round(resolvedStrokeWidth))}
        style={{ fontFamily: textStyle.fontFamily, fontWeight: 700 }}
      >
        TO
      </text>

      {/* Optional debug arc path toggle (commented out) */}
      {/* <path d={arcPath} fill="none" stroke="var(--color-brand-border, #E0DDD4)" /> */}
    </svg>
  );
};

/**
 * Compact "TO" variant.
 * Usage: <FriendsWordmark.To />
 */
const FriendsWordmarkTo = ({
  width = 160,
  height = 60,
  fontSize = 32,
  letterSpacing = 6,
  stroke = true,
  strokeWidth = 1,
  dropShadow = true,
  className,
  style,
}) => {
  const w = typeof width === "number" ? width : 160;
  const h = typeof height === "number" ? height : 60;
  const svgRef = React.useRef(null);
  const defaultStrokeColor = "var(--color-brand-background-light)";
  const resolvedStroke = typeof stroke === "boolean" ? (stroke ? defaultStrokeColor : "none") : (stroke || "none");
  const resolvedStrokeWidth = resolvedStroke === "none" ? 0 : strokeWidth;

  return (
    <svg
      ref={svgRef}
      className={["friends-wordmark to", className].filter(Boolean).join(" ")}
      width={width}
      height={height}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`TO wordmark, compact variant`}
      style={style}
    >
      <AutoDefs enableShadow={dropShadow} />
      <g
        data-shadow
        style={dropShadow ? { filter: svgRef.current?.dataset.shadowId ? `url(#${svgRef.current.dataset.shadowId})` : undefined } : undefined}
      >
        <text
          x={w / 2}
          y={h * 0.72}
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          stroke={resolvedStroke}
          strokeWidth={resolvedStrokeWidth}
          style={{
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
            fontWeight: 700,
          }}
        >
          TO
        </text>
      </g>
    </svg>
  );
};

FriendsWordmark.To = FriendsWordmarkTo;

export default FriendsWordmark;
export { FriendsWordmarkTo };
