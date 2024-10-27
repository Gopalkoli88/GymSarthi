import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-50 border-opacity-10 bg-transparent px-3 py-2 text-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:shadow-lg focus:shadow-blue-500 transition duration-300 ease-in-out transform focus:-translate-y-0.5 focus:scale-105 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
