"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FiTrendingUp, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { ReactNode } from "react";

interface StatCard {
  label: string;
  value: number | string;
  subtitle: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

interface DashboardStatsProps {
  stats: StatCard[];
}

const iconColors = [
  "bg-primary text-white",
  "bg-secondary text-white", 
  "bg-green-500 text-white",
  "bg-orange-500 text-white"
];

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="relative overflow-hidden border-border/40 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 rounded-2xl"
        >
          <CardContent className="pt-7 pb-6 px-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl ${iconColors[index % iconColors.length]} flex items-center justify-center text-2xl shadow-sm`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                  stat.trend === "up" ? "bg-green-100 text-green-700" :
                  stat.trend === "down" ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {stat.trend === "up" ? <FiArrowUp className="w-3 h-3" /> :
                   stat.trend === "down" ? <FiArrowDown className="w-3 h-3" /> :
                   <FiTrendingUp className="w-3 h-3" />}
                  {stat.trendValue}
                </div>
              )}
            </div>
            <div className="text-3xl font-black tracking-tight mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-bold text-foreground mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
