"use client";

import { Calendar, LayoutGrid, LayoutList } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ViewSelector({ view, onViewChange }) {
  return (
    <TooltipProvider>
      <div className="flex items-center bg-gray-900 border border-gray-800 rounded-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-l-md rounded-r-none px-3 ${
                view === "day"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => onViewChange("day")}
            >
              <LayoutList className="w-4 h-4 mr-1" />
              Day
            </Button>
          </TooltipTrigger>
          <TooltipContent>Day view</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-3 ${
                view === "week"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => onViewChange("week")}
            >
              <LayoutGrid className="w-4 h-4 mr-1" />
              Week
            </Button>
          </TooltipTrigger>
          <TooltipContent>Week view</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-l-none rounded-r-md px-3 ${
                view === "month"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => onViewChange("month")}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Month
            </Button>
          </TooltipTrigger>
          <TooltipContent>Month view</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
