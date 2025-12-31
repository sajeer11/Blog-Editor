// components/ui/checkbox.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // helper to merge classNames

interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 ",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
