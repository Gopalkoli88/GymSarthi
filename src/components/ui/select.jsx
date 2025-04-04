import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/utils";

// Select Root Component
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// Select Trigger Component
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative flex w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white shadow-md transition-all duration-300 ease-in-out  ",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="w-4 h-4 transition-transform duration-300 ease-in-out opacity-70 group-hover:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Scroll Up Button
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-gray-500 hover:text-white", className)}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

// Scroll Down Button
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-gray-500 hover:text-white", className)}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

// Select Content Component
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-80 w-full min-w-[8rem] overflow-hidden rounded-md border border-gray-700 bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out data-[state=open]:scale-100 data-[state=closed]:scale-95 data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className="p-2">{children}</SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Select Label Component
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-3 py-2 text-sm font-semibold text-gray-400", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// Select Item Component
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-300 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-700",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute flex items-center justify-center w-4 h-4 right-3">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="w-4 h-4 text-white" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Select Separator Component
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-gray-600", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Export Components
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
