"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { createClient } from "@/lib/supabase/client";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ChartBars } from "@/components/dashboard/chart-bars";
import { RegistrantsTable } from "@/components/dashboard/registrants-table";
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview";
import { DashboardLayout } from "./components/dashboard-layout";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardFilters, FilterState } from "./components/dashboard-filters";
import { FiClipboard, FiMusic, FiGlobe } from "react-icons/fi";
import { MdSportsSoccer } from "react-icons/md";

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
  accommodation: string;
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
  const [filters, setFilters] = useState<FilterState>({
    city: "",
    profession: "",
    nationality: "",
    football: "",
    music: "",
    tshirtSize: "",
    tshirtColor: "",
    arrival: "",
  });

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
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
      "Hébergement",
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
      reg.accommodation || "Non",
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

  const handleExportExcel = (data: Registration[], filterType: string) => {
    if (data.length === 0) {
      toast.error("Aucune donnée à exporter.");
      return;
    }

    // Prepare data for Excel
    const excelData = data.map((reg) => ({
      Date: new Date(reg.created_at).toLocaleDateString("fr-FR"),
      "Nom & Prénoms": reg.fullname,
      "Nationalité": reg.nationality,
      "CIN/Passeport": reg.id_number,
      "Ville": reg.city,
      "Profession": reg.profession || "",
      "Âge": reg.age?.toString() || "",
      "Téléphone": reg.phone,
      "WhatsApp": reg.whatsapp || "",
      "Groupe Musical": reg.music,
      "Poste Musical": reg.music_role || "",
      "Commission": reg.commission,
      "Nom Commission": reg.commission_name || "",
      "Arrivée": reg.arrival,
      "Départ": reg.departure || "",
      "Hébergement": reg.accommodation || "Non",
      "Football": reg.football,
      "Niveau Football": reg.foot_level || "",
      "Taille T-shirt": reg.tshirt_size,
      "Couleur T-shirt": reg.tshirt_color,
      "Remarques": reg.remarks || "",
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inscrits");

    // Auto-size columns
    const maxWidth = 50;
    const colWidths = Object.keys(excelData[0] || {}).map((key) => ({
      wch: Math.min(
        Math.max(
          key.length,
          ...excelData.map((row) => String(row[key as keyof typeof row] || "").length)
        ),
        maxWidth
      ),
    }));
    worksheet["!cols"] = colWidths;

    // Generate filename
    const filterLabel = filterType === "all" ? "tous" : filterType.replace("city_", "ville_");
    const filename = `rhema2026_${filterLabel}_${new Date().toISOString().split("T")[0]}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);

    toast.success(`Export Excel téléchargé ! (${data.length} inscrits)`);
  };

  // Apply filters to registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      if (filters.city && reg.city !== filters.city) return false;
      if (filters.profession && reg.profession !== filters.profession) return false;
      if (filters.nationality && reg.nationality !== filters.nationality) return false;
      if (filters.football && reg.football !== filters.football) return false;
      if (filters.music && reg.music !== filters.music) return false;
      if (filters.tshirtSize && reg.tshirt_size !== filters.tshirtSize) return false;
      if (filters.tshirtColor && reg.tshirt_color !== filters.tshirtColor) return false;
      if (filters.arrival && reg.arrival !== filters.arrival) return false;
      return true;
    });
  }, [registrations, filters]);

  // Calculate statistics
  const total = registrations.length;
  const totalFiltered = filteredRegistrations.length;
  const musicians = registrations.filter((r) => r.music === "Oui").length;
  const footballers = registrations.filter((r) => r.football === "Oui").length;
  const cities = new Set(
    registrations.map((r) => r.city?.trim().toLowerCase()).filter(Boolean)
  ).size;

  const stats = [
    { label: "Inscrits", value: total, subtitle: "total enregistrés", icon: <FiClipboard className="w-6 h-6" /> },
    { label: "Musiciens", value: musicians, subtitle: "groupe musical", icon: <FiMusic className="w-6 h-6" /> },
    { label: "Footballeurs", value: footballers, subtitle: "participent au foot", icon: <MdSportsSoccer className="w-6 h-6" /> },
    { label: "Villes", value: cities, subtitle: "représentées", icon: <FiGlobe className="w-6 h-6" /> },
  ];

  // Calculate distributions (using filtered data)
  const tshirtSizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const sizeData = tshirtSizes
    .map((size) => ({
      label: size,
      count: filteredRegistrations.filter((r) => r.tshirt_size === size).length,
    }))
    .filter((item) => item.count > 0);

  const tshirtColors = ["Blanche", "Noire", "Bleu", "Rouge", "Vert"];
  const colorData = tshirtColors
    .map((color) => ({
      label: color,
      count: filteredRegistrations.filter((r) => r.tshirt_color === color).length,
      color: colorMap[color],
    }))
    .filter((item) => item.count > 0);

  const footballLevels = ["Niveau élevé", "Niveau intermédiaire", "Niveau loisir / amateur"];
  const footballData = [
    ...footballLevels.map((level) => ({
      label: level,
      count: filteredRegistrations.filter((r) => r.foot_level === level).length,
    })),
    {
      label: "Ne joue pas",
      count: filteredRegistrations.filter((r) => r.football !== "Oui").length,
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
      count: filteredRegistrations.filter((r) => r.arrival === time).length,
    }))
    .filter((item) => item.count > 0);

  return (
    <DashboardLayout onExportCSV={handleExportCSV} onLogout={handleLogout}>
      <DashboardHeader title="Tableau de bord" />

      <DashboardStats stats={stats} />

      {/* Filters Section */}
      <DashboardFilters
        registrations={registrations}
        onFilterChange={setFilters}
        onExport={handleExportExcel}
      />

      {/* Analytics Section */}
      {pageVisits.length > 0 && (
        <div id="stats" className="mb-6 sm:mb-8 scroll-mt-20">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-secondary rounded-full" />
            Statistiques des visites
          </h3>
          <AnalyticsOverview visits={pageVisits} />
        </div>
      )}

      {/* Registration Charts */}
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <div className="w-1 h-5 bg-primary rounded-full" />
        Répartition des inscriptions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
        <ChartBars title="Tailles tee-shirt" data={sizeData} total={totalFiltered} />
        <ChartBars title="Couleurs choisies" data={colorData} total={totalFiltered} />
        <ChartBars title="Niveau football" data={footballData} total={totalFiltered} />
        <ChartBars title="Arrivées prévues" data={arrivalData} total={totalFiltered} />
      </div>

      <div id="registrants" className="scroll-mt-20">
        <RegistrantsTable registrations={filteredRegistrations} onExportCSV={handleExportCSV} />
      </div>
    </DashboardLayout>
  );
}
