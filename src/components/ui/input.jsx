// for show clandericon write variant={true} in input
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, asChild = false, type = "text", variant = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";

    return (
      <div className="relative">
        <Comp
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-50 border-opacity-10 bg-transparent px-3 py-2 text-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:shadow-lg focus:shadow-blue-500 transition duration-300 ease-in-out transform focus:-translate-y-0.5 focus:scale-105 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {variant && (
          <CalendarIcon className="absolute w-6 h-6 text-gray-400 pointer-events-none right-3 top-2" />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
