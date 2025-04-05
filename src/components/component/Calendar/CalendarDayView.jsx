// "use client";

// import { format, isSameDay } from "date-fns";
// import { ClassEvent } from "./ClassEvent";

// export function CalendarDayView({ date, events }) {
//   const hours = Array.from({ length: 18 }, (_, i) => i + 5); // 7 AM to 8 PM

//   const filteredEvents = events.filter((event) => isSameDay(event.start, date));

//   const getEventPosition = (event) => {
//     const startHour = event.start.getHours() + event.start.getMinutes() / 60;
//     const endHour = event.end.getHours() + event.end.getMinutes() / 60;
//     const top = (startHour - 7) * 60; // Start from 7 AM
//     const height = (endHour - startHour) * 60;

//     return {
//       top: `${top}px`,
//       height: `${height}px`,
//     };
//   };

//   return (
//     <div className="flex flex-col h-full border border-gray-800 rounded-lg bg-gray-950">
//       <div className="sticky top-0 z-10 flex p-2 font-medium text-center border-b border-gray-800 bg-gray-950">
//         <div className="w-16"></div>
//         <div className="flex-1">{format(date, "EEEE, MMMM d")}</div>
//       </div>

//       <div className="relative flex flex-1 overflow-y-auto">
//         <div className="flex-shrink-0 w-16 border-r border-gray-800">
//           {hours.map((hour) => (
//             <div
//               key={hour}
//               className="relative h-[60px] border-b border-gray-800 px-2 text-right text-xs text-gray-500"
//             >
//               <span className="absolute -top-2 right-2">
//                 {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? "PM" : "AM"}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="relative flex-1">
//           {hours.map((hour) => (
//             <div key={hour} className="h-[60px] border-b border-gray-800"></div>
//           ))}

//           {filteredEvents.map((event) => {
//             const { top, height } = getEventPosition(event);
//             return (
//               <div
//                 key={event.id}
//                 className={`absolute left-1 right-1 rounded-md p-2 ${event.color}`}
//                 style={{ top, height }}
//               >
//                 <ClassEvent event={event} />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { format, isSameDay } from "date-fns";

import { cn } from "@/lib/utils";
import { ClassEvent } from "./ClassEvent";

export function CalendarDayView({ date, events }) {
  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

  const filteredEvents = events.filter((event) => isSameDay(event.start, date));

  const getEventPosition = (event) => {
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
    
    <div className="flex flex-col h-full border border-gray-800 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl ">
        
      <div className="sticky top-0 z-10 flex p-2 font-medium text-center border-b border-gray-800 bg-gray-950">
        <div className="w-16"></div>
        <div className="flex-1">{format(date, "EEEE, MMMM d")}</div>
      </div>

      <div className="relative flex flex-1 overflow-y-auto">
        <div className="flex-shrink-0 w-16 border-r border-gray-800">
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

        <div className="relative flex-1">
          {hours.map((hour) => (
            <div key={hour} className="h-[60px] border-b border-gray-800"></div>
          ))}

          {filteredEvents.map((event) => {
            const { top, height } = getEventPosition(event);
            return (
              <div
                key={event.id}
                className={cn(
                  "absolute left-1 right-1 rounded-md p-2 flex flex-col justify-center",
                  event.color
                )}
                style={{
                  top,
                  height,
                  display: "flex",
                  alignItems: "center",
                  overflow: "visible", // Ensure content isn't hidden
                  whiteSpace: "normal", // Allow text to wrap
                }}
              >
                <ClassEvent event={event} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


