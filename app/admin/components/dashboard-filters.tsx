"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FiFilter, 
  FiX, 
  FiDownload 
} from "react-icons/fi";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface DashboardFiltersProps {
  registrations: Registration[];
  onFilterChange: (filters: FilterState) => void;
  onExport: (data: Registration[], filterType: string) => void;
}

export interface FilterState {
  city: string;
  profession: string;
  nationality: string;
  football: string;
  music: string;
  tshirtSize: string;
  tshirtColor: string;
  arrival: string;
}

export function DashboardFilters({ registrations, onFilterChange, onExport }: DashboardFiltersProps) {
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

  // Extract unique values for filters
  const filterOptions = useMemo(() => ({
    cities: Array.from(new Set(registrations.map(r => r.city).filter(Boolean))).sort(),
    professions: Array.from(new Set(registrations.map(r => r.profession).filter(Boolean))).sort(),
    nationalities: Array.from(new Set(registrations.map(r => r.nationality).filter(Boolean))).sort(),
    tshirtSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    tshirtColors: ["Blanche", "Noire", "Bleu", "Rouge", "Vert"],
    arrivals: [
      "Vendredi matin (avant 12h)",
      "Vendredi après-midi (12h – 18h)",
      "Vendredi soir (18h – 19h)",
      "Samedi matin",
    ],
  }), [registrations]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      city: "",
      profession: "",
      nationality: "",
      football: "",
      music: "",
      tshirtSize: "",
      tshirtColor: "",
      arrival: "",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== "").length;

  // Filter registrations based on current filters
  const filteredData = useMemo(() => {
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

  return (
    <Card id="filters" className="mb-6 rounded-2xl border-border/40">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h4 className="text-sm font-bold flex items-center gap-2">
            <FiFilter className="w-4 h-4" />
            Filtres et Export
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </h4>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <FiX className="w-3 h-3 mr-1" />
              Effacer tout
            </Button>
          )}
        </div>
      </div>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* City Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Ville
            </label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Toutes les villes</option>
              {filterOptions.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Profession Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Profession
            </label>
            <select
              value={filters.profession}
              onChange={(e) => handleFilterChange("profession", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Toutes les professions</option>
              {filterOptions.professions.map((profession) => (
                <option key={profession} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>

          {/* Nationality Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Nationalité
            </label>
            <select
              value={filters.nationality}
              onChange={(e) => handleFilterChange("nationality", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Toutes les nationalités</option>
              {filterOptions.nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>

          {/* Football Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Football
            </label>
            <select
              value={filters.football}
              onChange={(e) => handleFilterChange("football", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Tous</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          {/* Music Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Groupe Musical
            </label>
            <select
              value={filters.music}
              onChange={(e) => handleFilterChange("music", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Tous</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          {/* T-shirt Size Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Taille T-shirt
            </label>
            <select
              value={filters.tshirtSize}
              onChange={(e) => handleFilterChange("tshirtSize", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Toutes les tailles</option>
              {filterOptions.tshirtSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* T-shirt Color Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Couleur T-shirt
            </label>
            <select
              value={filters.tshirtColor}
              onChange={(e) => handleFilterChange("tshirtColor", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Toutes les couleurs</option>
              {filterOptions.tshirtColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Arrival Filter */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Arrivée
            </label>
            <select
              value={filters.arrival}
              onChange={(e) => handleFilterChange("arrival", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Tous les créneaux</option>
              {filterOptions.arrivals.map((arrival) => (
                <option key={arrival} value={arrival}>
                  {arrival}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Export Options */}
        <div className="border-t border-border pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-2">
            Export Excel ({filteredData.length} inscrits):
          </span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="font-semibold">
                <FiDownload className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Options d'export</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onExport(registrations, "all")}>
                Tous les inscrits ({registrations.length})
              </DropdownMenuItem>
              {activeFiltersCount > 0 && (
                <DropdownMenuItem onClick={() => onExport(filteredData, "filtered")}>
                  Données filtrées ({filteredData.length})
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {filterOptions.cities.map((city) => (
                <DropdownMenuItem 
                  key={city}
                  onClick={() => onExport(
                    registrations.filter(r => r.city === city), 
                    `city_${city}`
                  )}
                >
                  {city} ({registrations.filter(r => r.city === city).length})
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
