import hoursData from "../../data/hours.json";

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABEL_SHORT = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

const DAY_LABEL_FULL = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function formatTime24To12(t) {
  if (!t) return "";
  const [hh, mm] = t.split(":").map(Number);
  const hour12 = ((hh + 11) % 12) + 1;
  const ampm = hh >= 12 ? "PM" : "AM";
  return `${hour12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

function hoursKey(day) {
  if (day.closed) return "CLOSED";
  return `${day.open || ""}-${day.close || ""}`;
}

function dayRangeLabel(startId, endId, short = true) {
  const labels = short ? DAY_LABEL_SHORT : DAY_LABEL_FULL;
  const start = labels[startId] ?? startId;
  const end = labels[endId] ?? endId;
  return startId === endId ? start : `${start}-${end}`;
}

function groupHoursByConsecutiveDays(days) {
  const map = new Map((days || []).map((d) => [d.id, d]));
  const ordered = DAY_ORDER.map((id) => map.get(id)).filter(Boolean);

  const groups = [];
  for (const d of ordered) {
    const key = hoursKey(d);
    const last = groups[groups.length - 1];

    if (!last || last.key !== key) {
      groups.push({
        key,
        startId: d.id,
        endId: d.id,
        closed: !!d.closed,
        open: d.open,
        close: d.close,
      });
    } else {
      last.endId = d.id;
    }
  }

  return groups;
}

/**
 * Renders a list of business hours from hours.json, grouped by consecutive days with same hours.
 * Format: "Mon-Fri: 6:00 AM - 2:00 PM" or "Closed"
 */
export default function HoursList({ className = "", showNote = true, variant = "default" }) {
  const { days, displayNote } = hoursData;
  const isCard = variant === "card";
  const groups = groupHoursByConsecutiveDays(days);

  return (
    <div className={className}>
      <ul className={isCard ? "space-y-0" : "space-y-2"} role="list">
        {groups.map((g, index) => {
          const hoursText = g.closed
            ? "Closed"
            : `${formatTime24To12(g.open)} - ${formatTime24To12(g.close)}`;
          return (
            <li
              key={`${g.startId}-${g.endId}-${g.key}`}
              className={
                isCard
                  ? `grid grid-cols-[1fr_auto] gap-x-4 items-center py-2.5 sm:py-3 text-sm sm:text-base ${index < groups.length - 1 ? "border-b border-brand-border-light" : ""}`
                  : "flex justify-between gap-4 items-center text-sm"
              }
            >
              <span className="font-medium text-brand-text-light min-w-0 text-left">
                <span className="sm:hidden">{dayRangeLabel(g.startId, g.endId, true)}</span>
                <span className="hidden sm:inline">{dayRangeLabel(g.startId, g.endId, false)}</span>
              </span>
              <span
                className={
                  isCard && g.closed
                    ? "text-brand-primary font-bold text-lg whitespace-nowrap text-right"
                    : "text-brand-primary whitespace-nowrap text-right"
                }
              >
                {isCard && !g.closed ? <span className="accent-price">{hoursText}</span> : hoursText}
              </span>
            </li>
          );
        })}
      </ul>
      {showNote && displayNote && (
        <p className="text-brand-text-muted text-xs mt-3">{displayNote}</p>
      )}
    </div>
  );
}

export { formatTime24To12 as formatTime };
