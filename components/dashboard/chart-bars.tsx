"use client";

import { Card, CardContent } from "@/components/ui/card";

interface BarData {
  label: string;
  count: number;
  color?: string;
}

interface ChartBarsProps {
  title: string;
  data: BarData[];
  total: number;
}

export function ChartBars({ title, data, total }: ChartBarsProps) {
  if (data.length === 0) {
    return (
      <Card className="rounded-2xl border-border/40">
        <CardContent className="pt-6 pb-6">
          <h4 className="text-sm font-bold mb-5 flex items-center gap-2">
            <div className="w-0.5 h-3.5 bg-primary rounded-full" />
            {title}
          </h4>
          <div className="text-center py-8 text-sm text-muted-foreground">
            Aucune donnée
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-border/40 hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-border/50">
        <h4 className="text-sm font-bold flex items-center gap-2">
          <div className="w-0.5 h-3.5 bg-primary rounded-full" />
          {title}
        </h4>
      </div>
      <CardContent className="pt-6 pb-6 px-5">
        <div className="space-y-3.5">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-xs font-medium text-foreground/70 w-28 flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-2">
                {item.color && (
                  <span
                    className="w-3 h-3 rounded-full border border-border/40 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                {item.label}
              </div>
              <div className="flex-1 h-2.5 bg-secondary/10 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.round((item.count / total) * 100)}%` }}
                />
              </div>
              <div className="text-sm font-bold text-primary w-8 text-right flex-shrink-0">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
