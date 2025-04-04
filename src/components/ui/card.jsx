import * as React from "react";
import { cn } from "@/lib/utils";

// Card Component with updated border, shadow, and hover effect
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      className="p-8 text-white border border-gray-700 shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl", // Slow down transition for better visibility
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// CardHeader with more consistent padding
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// CardTitle with more emphasis on text
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold tracking-wide text-gray-100", className)} // Increased text size for emphasis
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// CardDescription with adjusted color for better readability
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-gray-400", className)} {...props} /> // Added margin-top for spacing
));
CardDescription.displayName = "CardDescription";

// CardContent with padding adjustments
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-8", className)} {...props} />
));
CardContent.displayName = "CardContent";

// CardFooter with flexbox adjustments
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-end gap-4 p-6", className)} // Added justify-between for balanced footer layout
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
