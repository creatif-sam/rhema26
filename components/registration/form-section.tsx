"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ icon, title, children, className }: FormSectionProps) {
  return (
    <Card className={cn("relative overflow-hidden border-border/50 hover:border-border/80 transition-all", className)}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <CardContent className="pt-8 pb-8 px-6 md:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-base font-bold tracking-tight">{title}</h3>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
