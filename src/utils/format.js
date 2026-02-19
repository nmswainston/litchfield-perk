export function formatTime(time) {
  if (!time || typeof time !== "string") return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  if (Number.isNaN(hour)) return "";
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes || "00"} ${ampm}`;
}

function getTodayDayName() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  return days[today.getDay()];
}

/**
 * Returns today's hours from a days array (hours.json format).
 * @param {{ days: Array<{ label: string, closed: boolean, open?: string, close?: string }> }} hoursData
 * @returns {string} e.g. "6:00 AM-2:00 PM" or "Closed"
 */
export function getTodayHoursFromDays(hoursData) {
  const todayDayName = getTodayDayName();
  const days = hoursData?.days;
  if (!Array.isArray(days)) return "Closed";

  const today = days.find((d) => d?.label === todayDayName);
  if (!today || today.closed || !today?.open || !today?.close) {
    return "Closed";
  }
  const open = formatTime(today.open);
  const close = formatTime(today.close);
  return open && close ? `${open}-${close}` : "Closed";
}

/** @deprecated Use getTodayHoursFromDays with hours.json instead */
export function getTodayHours(hours) {
  const todayDayName = getTodayDayName();

  if (hours.sunday?.closed && todayDayName === "Sunday") {
    return "Closed";
  }

  for (const [key, group] of Object.entries(hours)) {
    if (key === "sunday") continue;

    if (group?.days && Array.isArray(group.days) && group.days.includes(todayDayName)) {
      const open = formatTime(group?.open);
      const close = formatTime(group?.close);
      return `${open}-${close}`;
    }
  }

  return "Closed";
}