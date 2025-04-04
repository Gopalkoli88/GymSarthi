
export { Input };
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  (
    { className, asChild = false, type = "text", variant = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";

    return (
      <div className="relative">
        <Comp
          type={type}
          className={cn(
           "mt-2 text-white bg-gray-800 border-gray-600 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 rounded-lg transition duration-300 ease-in-out w-full",
          )}
          ref={ref}
          {...props}
        />
        {variant && (
          <CalendarIcon   className="text-black bg-white border border-gray-300 rounded-lg shadow-md" />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";


