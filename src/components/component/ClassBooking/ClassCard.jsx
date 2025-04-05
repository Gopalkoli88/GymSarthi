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
    <Card className="bg-gray-700 border-gray-600">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center gap-1 text-gray-300 mt-1">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-sm">{format(new Date(date), "h:mm a")}</span>
        </div>
        <p className="text-sm text-gray-300 mt-1">Instructor: {instructor}</p>

        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>{bookedCount} booked</span>
            <span>{remainingSpots} spots left</span>
          </div>
          <Progress
            value={capacityPercentage}
            className="h-2 bg-gray-600"
            indicatorClassName={
              capacityPercentage > 80 ? "bg-red-500" : "bg-green-500"
            }
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onBook}
          disabled={isFull}
          variant={isFull ? "outline" : "default"}
          className="w-full"
        >
          {isFull ? "Class Full" : "Book Class"}
        </Button>
      </CardFooter>
    </Card>
  );
}
