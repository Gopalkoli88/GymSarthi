"use client";

import { addDays, format, isSameDay } from "date-fns";

import { cn } from "@/lib/utils";
import { ClassEvent } from "./ClassEvent";

export function CalendarWeekView({ date, events }) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(date, i));
  const hours = Array.from({ length: 18 }, (_, i) => i + 5); // 5 AM to 10 PM

  const getEventPosition = (event, dayIndex) => {
    const eventDay = new Date(event.start);
    if (!isSameDay(eventDay, days[dayIndex])) return null;

    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    const top = (startHour - 7) * 60; // 7 is the start hour
    const height = (endHour - startHour) * 60;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-800 bg-gray-950">
      <div className="sticky top-0 z-10 flex border-b border-gray-800 bg-gray-950 text-center font-medium">
        <div className="w-16 border-r border-gray-800"></div>
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 border-r border-gray-800 p-2 last:border-r-0",
              isSameDay(day, new Date()) && "bg-gray-800"
            )}
          >
            <div className="text-xs text-gray-400">{format(day, "EEE")}</div>
            <div>{format(day, "d")}</div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-1 overflow-y-auto">
        <div className="w-16 flex-shrink-0 border-r border-gray-800">
          {hours.map((hour) => (
            <div
              key={hour}
              className="relative h-[60px] border-b border-gray-800 px-2 text-right text-xs text-gray-500"
            >
              <span className="absolute -top-2 right-2">
                {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? "PM" : "AM"}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-1">
          {days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="relative flex-1 border-r border-gray-800 last:border-r-0"
            >
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-[60px] border-b border-gray-800"
                ></div>
              ))}

              {events.map((event) => {
                const position = getEventPosition(event, dayIndex);
                if (!position) return null;

                return (
                  <div
                    key={event.id}
                    className={cn(
                      "absolute left-1 right-1 rounded-md p-1",
                      event.color
                    )}
                    style={position}
                  >
                    <ClassEvent event={event} compact />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
