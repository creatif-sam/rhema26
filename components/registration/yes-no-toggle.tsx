"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface YesNoToggleProps {
  value: "Oui" | "Non";
  onChange: (value: "Oui" | "Non") => void;
  label: string;
  expandedContent?: React.ReactNode;
  className?: string;
}

export function YesNoToggle({
  value,
  onChange,
  label,
  expandedContent,
  className,
}: YesNoToggleProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          {label}
        </label>
        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            variant={value === "Oui" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange("Oui")}
            className={cn(
              "transition-all",
              value === "Oui" && "bg-primary text-primary-foreground"
            )}
          >
            Oui
          </Button>
          <Button
            type="button"
            variant={value === "Non" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange("Non")}
            className={cn(
              "transition-all",
              value === "Non" && "bg-primary text-primary-foreground"
            )}
          >
            Non
          </Button>
          {value === "Oui" && expandedContent && (
            <div className="w-full mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {expandedContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
