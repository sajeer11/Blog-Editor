import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full ml-5 mt-10 bg-white px-3 py-2 text-5xl placeholder:text-gray-400 focus:outline-none  isabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
