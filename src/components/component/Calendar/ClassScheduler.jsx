"use client";

import { useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ViewSelector } from "./ViewSelectors";
import { CalendarDayView } from "./CalendarDayView";
import { CalendarWeekView } from "./CalendarWeekView";
import { CalendarMonthView } from "./CalendarMonthView";

// Sample class data
// export const classData = [
//   {
//     id: 1,
//     title: "Mathematics",
//     instructor: "Dr. Smith",
//     location: "Room 101",
//     start: new Date(new Date().setHours(9, 0, 0, 0)),
//     end: new Date(new Date().setHours(10, 30, 0, 0)),
//     color: "bg-purple-700",
//   },
//   {
//     id: 2,
//     title: "Physics",
//     instructor: "Prof. Johnson",
//     location: "Room 203",
//     start: new Date(new Date().setHours(11, 0, 0, 0)),
//     end: new Date(new Date().setHours(12, 30, 0, 0)),
//     color: "bg-blue-700",
//   },
//   {
//     id: 3,
//     title: "Computer Science",
//     instructor: "Dr. Williams",
//     location: "Lab 305",
//     start: new Date(new Date().setHours(14, 0, 0, 0)),
//     end: new Date(new Date().setHours(16, 0, 0, 0)),
//     color: "bg-green-700",
//   },
//   {
//     id: 4,
//     title: "History",
//     instructor: "Prof. Davis",
//     location: "Room 108",
//     start: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
//         10,
//         0,
//         0,
//         0
//       )
//     ),
//     end: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
//         11,
//         30,
//         0,
//         0
//       )
//     ),
//     color: "bg-red-700",
//   },
//   {
//     id: 5,
//     title: "English Literature",
//     instructor: "Dr. Brown",
//     location: "Room 202",
//     start: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
//         13,
//         0,
//         0,
//         0
//       )
//     ),
//     end: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
//         14,
//         30,
//         0,
//         0
//       )
//     ),
//     color: "bg-yellow-700",
//   },
//   {
//     id: 6,
//     title: "Chemistry",
//     instructor: "Prof. Miller",
//     location: "Lab 104",
//     start: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 2)).setHours(
//         9,
//         30,
//         0,
//         0
//       )
//     ),
//     end: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 2)).setHours(
//         11,
//         0,
//         0,
//         0
//       )
//     ),
//     color: "bg-teal-700",
//   },
//   {
//     id: 7,
//     title: "Art History",
//     instructor: "Dr. Wilson",
//     location: "Room 301",
//     start: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 3)).setHours(
//         15,
//         0,
//         0,
//         0
//       )
//     ),
//     end: new Date(
//       new Date(new Date().setDate(new Date().getDate() + 3)).setHours(
//         16,
//         30,
//         0,
//         0
//       )
//     ),
//     color: "bg-pink-700",
//   },
// ];

export function ClassScheduler({events}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week");

  const navigatePrevious = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, -1));
    } else {
      setCurrentDate(addMonths(currentDate, -1));
    }
  };

  const navigateNext = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  const getDateRangeText = () => {
    if (view === "day") {
      return format(currentDate, "MMMM d, yyyy");
    } else if (view === "week") {
      const start = startOfWeek(currentDate);
      const end = addDays(start, 6);
      return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
    } else {
      return format(currentDate, "MMMM yyyy");
    }
  };

  return (
    <div className="flex flex-col h-screen text-white bg-gray-900 ">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Class Schedule</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={navigateToday}
            className="text-white bg-gray-900 border-gray-700 hover:bg-gray-800"
          >
            Today
          </Button>
          <ViewSelector view={view} onViewChange={setView} />
        </div>
      </header>

      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigatePrevious}
            className="text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateNext}
            className="text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-medium">{getDateRangeText()}</h2>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {view === "day" && (
          <CalendarDayView date={startOfDay(currentDate)} events={events} />
        )}
        {view === "week" && (
          <CalendarWeekView
            date={startOfWeek(currentDate)}
            events={events}
          />
        )}
        {view === "month" && (
          <CalendarMonthView
            date={startOfMonth(currentDate)}
            events={events}
          />
        )}
      </div>
    </div>
  );
}
