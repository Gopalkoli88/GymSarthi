"use client";

import {
  addDays,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
} from "date-fns";

export function CalendarMonthView({ date, events }) {
  const monthStart = startOfMonth(date);
  const startDay = getDay(monthStart);

  const daysInMonth = Array.from({ length: 42 }, (_, i) => {
    const day = addDays(monthStart, i - startDay);
    return {
      date: day,
      isCurrentMonth: isSameMonth(day, date),
      events: events.filter((event) => isSameDay(event.start, day)),
    };
  });

  const weeks = Array.from({ length: 6 }, (_, i) =>
    daysInMonth.slice(i * 7, (i + 1) * 7)
  );

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-800 bg-gray-950">
      <div className="grid grid-cols-7 border-b border-gray-800 bg-gray-900 text-center font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-cols-7 border-b border-gray-800"
          >
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`min-h-[100px] border-r border-gray-800 p-1 ${
                  !day.isCurrentMonth ? "bg-gray-900 text-gray-600" : ""
                } ${isSameDay(day.date, new Date()) ? "bg-gray-800" : ""}`}
              >
                <div className="mb-1 text-right text-sm">
                  {format(day.date, "d")}
                </div>
                <div className="flex flex-col gap-1">
                  {day.events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`truncate rounded px-1 py-0.5 text-xs ${event.color}`}
                      title={`${event.title} - ${event.location}`}
                    >
                      {format(event.start, "h:mm a")} {event.title}
                    </div>
                  ))}
                  {day.events.length > 3 && (
                    <div className="text-xs text-gray-400">
                      +{day.events.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
