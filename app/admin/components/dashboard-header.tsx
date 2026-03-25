"use client";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const now = new Date();
  const dateString = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div id="dashboard" className="mb-6 sm:mb-8 scroll-mt-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground">
        {subtitle || `Actualisé le ${dateString}`}
      </p>
    </div>
  );
}
