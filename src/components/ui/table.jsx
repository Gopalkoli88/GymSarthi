import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full p-4 overflow-hidden rounded-lg overscroll-contain">
    {" "}
    {/* Added padding around the table */}
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";
// const Table = React.forwardRef(({ className, ...props }, ref) => (
//   <div className="relative w-full p-4 overflow-hidden rounded-xl overscroll-contain">
//     <table
//       ref={ref}
//       className={cn("rounded-xl border border-blue-600 bg-blue-400 text-card-foreground shadow", className)} // Added border class here
//       {...props} />
//   </div>
// ))
// Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b bg-gray-100 ", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gray-100 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-opacity-20 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#1455f4]     hover:to-[#000000] hover:text-white rounded-lg cursor-pointer ",

      //"border-b transition-transform duration-300 ease-in-out transform hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 hover:text-white rounded-lg cursor-pointer",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 py-2 text-left align-middle font-medium text-gray-700 bg-gray-200",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// const TableCell = React.forwardRef(({ className, ...props }, ref) => (
//   <td
//     ref={ref}
//     className={cn(
//       "p-4 align-middle border-t border-gray-200",
//       className
//     )}
//     {...props} />
// ))
// TableCell.displayName = "TableCell"

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle border-t border-opacity-30  border-blue-700 ", // Lighter blue for a subtle contrast
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-500", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
