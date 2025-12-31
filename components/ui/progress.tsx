import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const percent = Math.min(Math.max(value / max, 0), 1) * 100;
    return (
      <div
        ref={ref}
        className={cn("w-full h-2 bg-gray-200 rounded-full overflow-hidden", className)}
        {...props}
      >
        <div
          className="h-full bg-blue-500 transition-all duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";
