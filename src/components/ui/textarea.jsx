import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
// "block w-full h-10 rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder-transparent text-gray-800 disabled:cursor-not-allowed disabled:opacity-50",
      // "mt-2 h-32 text-white bg-gray-800 border-gray-600 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out w-full resize-none overflow-hidden",
    "w-full p-3 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-0 focus:border-gray-600",


        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
