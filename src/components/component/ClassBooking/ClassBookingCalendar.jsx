"use client";

import { useState } from "react";
import {
  addDays,
  format,
  startOfWeek,
  addWeeks,
  subWeeks,
  isSameDay,
} from "date-fns";

import { toast, ToastContainer } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassCard } from "./ClassCard";
import { useDispatch } from "react-redux";
import { bookClass, fetchClasses } from "@/redux/classSlice";

// clas booking
export function ClassBookingCalendar({ classes }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(startDate, i)
  );

  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const bookClassSlot = async (classId) => {
    try {
      const resultAction = await dispatch(bookClass(classId));

      if (bookClass.fulfilled.match(resultAction)) {
        toast.success("You've successfully booked the class!");
        await dispatch(fetchClasses());
      } else if (bookClass.rejected.match(resultAction)) {
        // Show the message from payload or fallback
        const errorMessage =
          resultAction.payload?.message || "Booking failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong while booking the class.");
    }
  };

  const getClassesForDay = (day) => {
    return classes.filter((c) => isSameDay(new Date(c.dateTime), day));
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {format(startDate, "MMMM d")} -{" "}
          {format(addDays(startDate, 6), "MMMM d, yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4">
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className="text-center p-2 bg-gray-700 rounded-t-lg mb-2">
              <p className="font-medium">{format(day, "EEEE")}</p>
              <p className="text-sm text-gray-300">{format(day, "MMM d")}</p>
            </div>
            <div className="space-y-3">
              {getClassesForDay(day).length > 0 ? (
                getClassesForDay(day).map((classItem) => (
                  <ClassCard
                    key={classItem._id}
                    classData={{
                      title: classItem.name,
                      date: classItem.dateTime,
                      maxCapacity: classItem.maxCapacity,
                      bookedCount: classItem.bookings.length,
                      instructor: classItem.trainerId?.name || "TBA",
                    }}
                    onBook={() => bookClassSlot(classItem._id)}
                  />
                ))
              ) : (
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-400">No classes</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
