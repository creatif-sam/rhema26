"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { AdminNavigation } from "@/components/dashboard/admin-navigation";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ChartBars } from "@/components/dashboard/chart-bars";
import { RegistrantsTable } from "@/components/dashboard/registrants-table";
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview";

interface Registration {
  id: string;
  created_at: string;
  fullname: string;
  nationality: string;
  id_number: string;
  city: string;
  profession: string;
  age: number | null;
  phone: string;
  whatsapp: string | null;
  music: string;
  music_role: string | null;
  commission: string;
  commission_name: string | null;
  arrival: string;
  departure: string | null;
  football: string;
  foot_level: string | null;
  tshirt_size: string;
  tshirt_color: string;
  remarks: string | null;
}

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

interface AdminDashboardClientProps {
  registrations: Registration[];
  pageVisits: PageVisit[];
}

const colorMap: Record<string, string> = {
  Blanche: "#EEE",
  Noire: "#222",
  Bleu: "#3D8EF0",
  Rouge: "#E05252",
  Vert: "#52B788",
};

// Admin Dashboard Client Component with Analytics
export function AdminDashboardClient({ registrations, pageVisits }: AdminDashboardClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      toast.error("Aucune donnée à exporter.");
      return;
    }

    const headers = [
      "Date",
      "Nom",
      "Nationalité",
      "CIN/Passeport",
      "Ville",
      "Profession",
      "Âge",
      "Téléphone",
      "WhatsApp",
      "Groupe Musical",
      "Poste",
      "Commission",
      "Laquelle",
      "Arrivée",
      "Départ",
      "Football",
      "Niveau",
      "Taille",
      "Couleur",
      "Remarques",
    ];

    const rows = registrations.map((reg) => [
      new Date(reg.created_at).toLocaleDateString("fr-FR"),
      reg.fullname,
      reg.nationality,
      reg.id_number,
      reg.city,
      reg.profession || "",
      reg.age?.toString() || "",
      reg.phone,
      reg.whatsapp || "",
      reg.music,
      reg.music_role || "",
      reg.commission,
      reg.commission_name || "",
      reg.arrival,
      reg.departure || "",
      reg.football,
      reg.foot_level || "",
      reg.tshirt_size,
      reg.tshirt_color,
      (reg.remarks || "").replace(/,/g, ";"),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rhema2026_inscrits_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Export CSV téléchargé !");
  };

  // Calculate statistics
  const total = registrations.length;
  const musicians = registrations.filter((r) => r.music === "Oui").length;
  const footballers = registrations.filter((r) => r.football === "Oui").length;
  const cities = new Set(
    registrations.map((r) => r.city?.trim().toLowerCase()).filter(Boolean)
  ).size;

  const stats = [
    { label: "Inscrits", value: total, subtitle: "total enregistrés", icon: "📋" },
    { label: "Musiciens", value: musicians, subtitle: "groupe musical", icon: "🎵" },
    { label: "Footballeurs", value: footballers, subtitle: "participent au foot", icon: "⚽" },
    { label: "Villes", value: cities, subtitle: "représentées", icon: "🌍" },
  ];

  // Calculate distributions
  const tshirtSizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const sizeData = tshirtSizes
    .map((size) => ({
      label: size,
      count: registrations.filter((r) => r.tshirt_size === size).length,
    }))
    .filter((item) => item.count > 0);

  const tshirtColors = ["Blanche", "Noire", "Bleu", "Rouge", "Vert"];
  const colorData = tshirtColors
    .map((color) => ({
      label: color,
      count: registrations.filter((r) => r.tshirt_color === color).length,
      color: colorMap[color],
    }))
    .filter((item) => item.count > 0);

  const footballLevels = ["Niveau élevé", "Niveau intermédiaire", "Niveau loisir / amateur"];
  const footballData = [
    ...footballLevels.map((level) => ({
      label: level,
      count: registrations.filter((r) => r.foot_level === level).length,
    })),
    {
      label: "Ne joue pas",
      count: registrations.filter((r) => r.football !== "Oui").length,
    },
  ].filter((item) => item.count > 0);

  const arrivalTimes = [
    "Vendredi matin (avant 12h)",
    "Vendredi après-midi (12h – 18h)",
    "Vendredi soir (18h – 19h)",
    "Samedi matin",
  ];
  const arrivalData = arrivalTimes
    .map((time) => ({
      label: time,
      count: registrations.filter((r) => r.arrival === time).length,
    }))
    .filter((item) => item.count > 0);

  const now = new Date();
  const dateString = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation onExportCSV={handleExportCSV} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-black tracking-tight mb-2">Tableau de bord</h2>
          <p className="text-sm text-muted-foreground">Actualisé le {dateString}</p>
        </div>

        <DashboardStats stats={stats} />

        {/* Analytics Section */}
        {pageVisits.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-secondary rounded-full" />
              Statistiques des visites
            </h3>
            <AnalyticsOverview visits={pageVisits} />
          </div>
        )}

        {/* Registration Charts */}
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-primary rounded-full" />
          Répartition des inscriptions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <ChartBars title="Tailles tee-shirt" data={sizeData} total={total} />
          <ChartBars title="Couleurs choisies" data={colorData} total={total} />
          <ChartBars title="Niveau football" data={footballData} total={total} />
          <ChartBars title="Arrivées prévues" data={arrivalData} total={total} />
        </div>

        <RegistrantsTable registrations={registrations} onExportCSV={handleExportCSV} />
      </div>
    </div>
  );
}
