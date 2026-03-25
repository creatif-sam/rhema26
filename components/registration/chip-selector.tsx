"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ChipSelectorProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
  className?: string;
}

export function ChipSelector({
  options,
  value,
  onChange,
  label,
  required = false,
  className,
}: ChipSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
              "text-sm font-medium hover:border-primary/50",
              value === option
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center",
                "transition-all",
                value === option
                  ? "border-primary bg-primary"
                  : "border-current opacity-40"
              )}
            >
              {value === option && <Check className="w-2 h-2 text-background" strokeWidth={3} />}
            </div>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
