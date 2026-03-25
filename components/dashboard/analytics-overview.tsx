"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FiEye, FiUser, FiTrendingUp, FiClock } from "react-icons/fi";

interface PageVisit {
  id: string;
  page_path: string;
  session_id: string;
  visited_at: string;
  user_agent: string | null;
  referrer: string | null;
  screen_width: number | null;
  screen_height: number | null;
}

interface AnalyticsOverviewProps {
  visits: PageVisit[];
}

export function AnalyticsOverview({ visits }: AnalyticsOverviewProps) {
  // Calculate analytics
  const totalVisits = visits.length;
  const uniqueSessions = new Set(visits.map((v) => v.session_id)).size;
  
  // Last 24 hours
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentVisits = visits.filter((v) => new Date(v.visited_at) > last24h).length;
  
  // Page breakdown
  const pageBreakdown = visits.reduce((acc, visit) => {
    const path = visit.page_path || "/";
    acc[path] = (acc[path] || 0) + 1;
    return {};
  }, {} as Record<string, number>);

  const topPages = Object.entries(pageBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([path, count]) => ({
      path: path === "/" ? "Accueil / Inscription" : 
            path === "/heeam" ? "HEEAM" :
            path === "/editions-precedentes" ? "Éditions Précédentes" :
            path,
      visits: count,
      percentage: ((count / totalVisits) * 100).toFixed(1)
    }));

  // Device types
  const mobileVisits = visits.filter((v) => 
    v.user_agent?.toLowerCase().includes("mobile") || 
    (v.screen_width && v.screen_width< 768)
  ).length;
  
  const desktopVisits = totalVisits - mobileVisits;

  const stats = [
    { 
      label: "Total Visites", 
      value: totalVisits, 
      icon: FiEye, 
      subtitle: "depuis le début",
      color: "bg-primary/10 text-primary"
    },
    { 
      label: "Visiteurs Uniques", 
      value: uniqueSessions, 
      icon: FiUser, 
      subtitle: "sessions distinctes",
      color: "bg-secondary/10 text-secondary"
    },
    { 
      label: "Dernières 24h", 
      value: recentVisits, 
      icon: FiClock, 
      subtitle: "visites récentes",
      color: "bg-green-500/10 text-green-600"
    },
    { 
      label: "Taux Engagement", 
      value: `${Math.round((uniqueSessions / totalVisits) * 100)}%`, 
      icon: FiTrendingUp, 
      subtitle: "interaction moyenne",
      color: "bg-orange-500/10 text-orange-600"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/40 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-foreground mb-0.5">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pages & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="border-border/40">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <div className="w-0.5 h-3.5 bg-primary rounded-full" />
              Pages les plus visitées
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topPages.map((page, idx) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{page.path}</div>
                      <div className="text-xs text-muted-foreground">{page.visits} visites</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary">{page.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="border-border/40">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <div className="w-0.5 h-3.5 bg-secondary rounded-full" />
              Répartition par appareil
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Mobile */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">📱 Mobile</span>
                  <span className="text-sm font-bold text-secondary">
                    {mobileVisits} ({Math.round((mobileVisits / totalVisits) * 100)}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-secondary/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full transition-all duration-500"
                    style={{ width: `${(mobileVisits / totalVisits) * 100}%` }}
                  />
                </div>
              </div>

              {/* Desktop */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">💻 Desktop</span>
                  <span className="text-sm font-bold text-primary">
                    {desktopVisits} ({Math.round((desktopVisits / totalVisits) * 100)}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(desktopVisits / totalVisits) * 100}%` }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-border/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">{totalVisits}</div>
                  <div className="text-xs text-muted-foreground">Total des visites enregistrées</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
