  // done
  import * as React from "react";
  import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
  import { DayPicker } from "react-day-picker";
  import { cn } from "@/lib/utils";
  import { buttonVariants } from "@/components/ui/button";

  function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
  }) {
    return (
      <div className="relative z-50">
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn(
            "p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700", // Light & Dark Mode Support
            className
          )}
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium text-gray-900 dark:text-gray-200",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-gray-200 dark:bg-gray-700 p-0 opacity-70 hover:opacity-100 border border-gray-300 dark:border-gray-600"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-gray-700 dark:text-gray-300 rounded-md w-8 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: cn(
              "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
              props.mode === "range"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md"
            ),
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-700"
            ),
            day_range_start: "bg-blue-500 text-white rounded-l-md",
            day_range_end: "bg-blue-500 text-white rounded-r-md",
            day_selected:
              "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600",
            day_today: "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-bold",
            day_outside:
              "text-gray-400 dark:text-gray-500 opacity-60 hover:bg-gray-200 dark:hover:bg-gray-600",
            day_disabled: "text-gray-400 dark:text-gray-500 opacity-50",
            day_range_middle:
              "bg-blue-300 dark:bg-blue-600 text-gray-900 dark:text-gray-100",
            day_hidden: "invisible",
            ...classNames,
          }}
          components={{
            IconLeft: ({ ...props }) => (
              <ChevronLeftIcon className="w-4 h-4 text-gray-900 hover:text-white dark:text-gray-200" />
            ),
            IconRight: ({ ...props }) => (
              <ChevronRightIcon className="w-4 h-4 text-gray-900 hover:text-white dark:text-gray-200" />
            ),
          }}
          {...props}
        />
      </div>
    );
  }
  Calendar.displayName = "Calendar";

  export { Calendar };

  // import * as React from "react";
  // import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
  // import { DayPicker } from "react-day-picker";
  // import { cn } from "@/lib/utils";
  // import { buttonVariants } from "@/components/ui/button";
  
  // function Calendar({
  //   className,
  //   classNames,
  //   showOutsideDays = true,
  //   ...props
  // }) {
  //   return (
  //     <div className="relative z-50">
  //       <DayPicker
  //         showOutsideDays={showOutsideDays}
  //         className={cn(
  //           "p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-lg", // Changed background to gray-100
  //           className
  //         )}
  //         classNames={{
  //           months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  //           month: "space-y-4",
  //           caption: "flex justify-center pt-1 relative items-center",
  //           caption_label: "text-sm font-medium text-gray-800", // Added text-gray-800
  //           nav: "space-x-1 flex items-center",
  //           nav_button: cn(
  //             buttonVariants({ variant: "outline" }),
  //             "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-800" // Added text-gray-800
  //           ),
  //           nav_button_previous: "absolute left-1",
  //           nav_button_next: "absolute right-1",
  //           table: "w-full border-collapse space-y-1",
  //           head_row: "flex",
  //           head_cell:
  //             "text-gray-600 rounded-md w-8 font-normal text-[0.8rem]", // Changed text color to gray-600
  //           row: "flex w-full mt-2",
  //           cell: cn(
  //             "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-200 [&:has([aria-selected].day-outside)]:bg-gray-200/50 [&:has([aria-selected].day-range-end)]:rounded-r-md", // Changed background to gray-200
  //             props.mode === "range"
  //               ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
  //               : "[&:has([aria-selected])]:rounded-md"
  //           ),
  //           day: cn(
  //             buttonVariants({ variant: "ghost" }),
  //             "h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-gray-800" // Added text-gray-800
  //           ),
  //           day_range_start: "day-range-start",
  //           day_range_end: "day-range-end",
  //           day_selected:
  //             "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white", // Changed to blue-500 for selection
  //           day_today: "bg-gray-300 text-gray-800", // Changed to gray-300 for today
  //           day_outside:
  //             "day-outside text-gray-400 opacity-50 aria-selected:bg-gray-200/50 aria-selected:text-gray-400 aria-selected:opacity-30", // Changed text and background colors
  //           day_disabled: "text-gray-400 opacity-50", // Changed text color to gray-400
  //           day_range_middle:
  //             "aria-selected:bg-gray-200 aria-selected:text-gray-800", // Changed background and text colors
  //           day_hidden: "invisible",
  //           ...classNames,
  //         }}
  //         components={{
  //           IconLeft: ({ ...props }) => <ChevronLeftIcon className="w-4 h-4 text-gray-800" />, // Added text-gray-800
  //           IconRight: ({ ...props }) => <ChevronRightIcon className="w-4 h-4 text-gray-800" />, // Added text-gray-800
  //         }}
  //         {...props}
  //       />
  //     </div>
  //   );
  // }
  // Calendar.displayName = "Calendar";
  
  // export { Calendar };