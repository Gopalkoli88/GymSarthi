import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full p-10 overflow-auto shadow-2xl rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-3xl shadow-lg border border-gray-700",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white uppercase tracking-wide rounded-t-3xl shadow-md",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("divide-y divide-gray-700", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gradient-to-br from-gray-800 to-gray-900 font-medium text-gray-300 rounded-b-3xl shadow-md",
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
      "border-b border-gray-700 transition duration-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 hover:text-blue-400 cursor-pointer",
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
      "h-12 px-6 py-3 text-left font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500 shadow-sm",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle border-t border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 transition duration-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 rounded-lg shadow-sm",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-400 text-center", className)}
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