 

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
 
  // return (
  //   <div className="overflow-hidden bg-gray-800 rounded-lg shadow-xl">
  //     <div className="flex items-center justify-between p-4 bg-gray-700">
  //       <h2 className="text-xl font-semibold">
  //         {format(startDate, "MMMM d")} -{" "}
  //         {format(addDays(startDate, 6), "MMMM d, yyyy")}
  //       </h2>
  //       <div className="flex gap-2">
  //         <Button variant="outline" size="icon" onClick={prevWeek}>
  //           <ChevronLeft className="w-4 h-4" />
  //         </Button>
  //         <Button variant="outline" size="icon" onClick={nextWeek}>
  //           <ChevronRight className="w-4 h-4" />
  //         </Button>
  //       </div>
  //     </div>

  //     <div className="flex flex-col gap-4 p-4 max-h-[90vh] overflow-y-auto">
  //       {weekDays.map((day, dayIndex) => (
  //         <div key={dayIndex} className="flex flex-col gap-2">
  //           <div className="flex items-start gap-4">
  //             {/* Day name + date vertically */}
  //             <div className="min-w-[100px] text-center bg-gray-700 rounded-lg p-2">
  //               <p className="font-medium">{format(day, "EEEE")}</p>
  //               <p className="text-sm text-gray-300">{format(day, "MMM d")}</p>
  //             </div>

  //             {/* Class Cards vertically beside the day */}
  //             {getClassesForDay(day).length > 0 ? (
  //               <div className="flex flex-wrap w-full gap-3">
  //                 {getClassesForDay(day).map((classItem) => (
  //                   <div key={classItem._id} className="w-[220px]">
  //                     <ClassCard
  //                       classData={{
  //                         title: classItem.name,
  //                         date: classItem.dateTime,
  //                         maxCapacity: classItem.maxCapacity,
  //                         bookedCount: classItem.bookings.length,
  //                         instructor: classItem.trainerId?.name || "TBA",
  //                       }}
  //                       onBook={() => bookClassSlot(classItem._id)}
  //                     />
  //                   </div>
  //                 ))}
  //               </div>
  //             ) : (
  //               <div className="w-full p-4 text-center rounded-lg bg-gray-700/50">
  //                 <p className="text-gray-400">No classes</p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     <ToastContainer />
  //   </div>
  // );

  return (

    <div className="overflow-hidden bg-gray-800 rounded-lg shadow-xl">
      
      <div className="flex items-center justify-between p-4 bg-gray-700">
        <h2 className="text-xl font-semibold">
          {format(startDate, "MMMM d")} -{" "}
          {format(addDays(startDate, 6), "MMMM d, yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button className=  "text-gray-900 border shadow-sm border-input bg-background bg-accent text-accent-foreground" size="icon" onClick={prevWeek}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className=  "text-gray-900 border shadow-sm border-input bg-background bg-accent text-accent-foreground" size="icon" onClick={nextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
  
      <div className="flex flex-col gap-4 p-4 max-h-[90vh] overflow-y-auto">
    {weekDays.map((day, dayIndex) => (
      <div key={dayIndex} className="flex flex-col gap-2">
        <div className="flex items-start gap-4">
          {/* Day name + date vertically */}
          <div className="min-w-[100px] text-center bg-gray-700 rounded-lg p-2">
            <p className="font-medium">{format(day, "EEEE")}</p>
            <p className="text-sm text-gray-300">{format(day, "MMM d")}</p>
          </div>
  
          {/* Class Cards vertically beside the day */}
          {getClassesForDay(day).length > 0 ? (
            <div className="flex flex-wrap w-full gap-3">
              {getClassesForDay(day).map((classItem) => (
                <div key={classItem._id} className="w-[270px]">
                  <ClassCard
                    classData={{
                      title: classItem.name,
                      date: classItem.dateTime,
                      maxCapacity: classItem.maxCapacity,
                      bookedCount: classItem.bookings.length,
                      instructor: classItem.trainerId?.name || "TBA",
                    }}
                    onBook={() => bookClassSlot(classItem._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full p-4 text-center rounded-lg bg-gray-700/50">
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
