 
"use client";

import { Clock } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "./ProgressClass";

export function ClassCard({ classData, onBook }) {
  const { title, date, maxCapacity, bookedCount, instructor } = classData;
  const remainingSpots = maxCapacity - bookedCount;
  const isFull = remainingSpots === 0;
  const capacityPercentage = (bookedCount / maxCapacity) * 100;
 

  return (
    <div className="w-full p-4 space-y-3 transition-all duration-200 bg-gray-800 border border-gray-700 shadow-sm rounded-xl hover:shadow-md">
      <h3 className="text-lg font-bold text-white line-clamp-1">{title}</h3>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock className="flex-shrink-0 w-4 h-4" />
        <span>{format(new Date(date), "h:mm a")}</span>
      </div>

      <p className="text-sm text-gray-400">
        <span className="text-gray-500">Instructor: </span>
        <span className="font-medium text-gray-300">{instructor}</span>
      </p>

      <div className="mt-2 space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{bookedCount} booked</span>
          <span
            className={remainingSpots < 3 ? "text-red-400" : "text-green-400"}
          >
            {remainingSpots} spots left
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${
              capacityPercentage > 90
                ? "bg-red-500"
                : capacityPercentage > 75
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${capacityPercentage}%` }}
          ></div>
        </div>
      </div>

      <button
        onClick={onBook}
        disabled={isFull}
        className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
          isFull
            ? "border border-gray-600 text-gray-500 bg-gray-700 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        }`}
      >
        {isFull ? "Class Full" : "Book Now"}
      </button>
    </div>
  );
}
