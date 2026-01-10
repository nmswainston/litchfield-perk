export function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

function getTodayDayName() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  return days[today.getDay()];
}

export function getTodayHours(hours) {
  const todayDayName = getTodayDayName();
  
  if (hours.sunday?.closed && todayDayName === "Sunday") {
    return 'Closed';
  }
  
  for (const [key, group] of Object.entries(hours)) {
    if (key === 'sunday') continue; // Already handled
    
    if (group.days && Array.isArray(group.days) && group.days.includes(todayDayName)) {
      const open = formatTime(group.open);
      const close = formatTime(group.close);
      return `${open}–${close}`;
    }
  }
  
  return 'Closed';
}