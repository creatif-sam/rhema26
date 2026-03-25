"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

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

interface RegistrantsTableProps {
  registrations: Registration[];
  onExportCSV: () => void;
}

const colorMap: Record<string, string> = {
  Blanche: "#EEE",
  Noire: "#222",
  Bleu: "#3D8EF0",
  Rouge: "#E05252",
  Vert: "#52B788",
};

export function RegistrantsTable({ registrations, onExportCSV }: RegistrantsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRegistrations = registrations.filter((reg) => {
    const query = searchQuery.toLowerCase();
    return (
      reg.fullname.toLowerCase().includes(query) ||
      reg.city.toLowerCase().includes(query) ||
      reg.profession?.toLowerCase().includes(query)
    );
  });

  return (
    <Card className="mb-4 rounded-2xl border-border/40">
      <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-sm font-bold flex items-center gap-2">
          <div className="w-0.5 h-3.5 bg-primary rounded-full" />
          Liste des inscrits
        </h4>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-56"
            />
          </div>
          <Button onClick={onExportCSV} size="sm" className="font-semibold">
            ⬇ Export
          </Button>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-14 text-sm text-muted-foreground">
              Aucun inscrit trouvé.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    #
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Nom & Prénoms
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Nationalité
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    CIN/Passeport
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Ville
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Âge
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Taille
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Couleur
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Football
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Arrivée
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg, index) => (
                  <tr
                    key={reg.id}
                    className="border-b border-border/40 hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-foreground/60 text-xs">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{reg.fullname}</div>
                      <div className="text-xs text-muted-foreground">{reg.profession}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">{reg.nationality}</td>
                    <td className="px-4 py-3 text-xs">{reg.id_number}</td>
                    <td className="px-4 py-3">{reg.city}</td>
                    <td className="px-4 py-3">{reg.age || "—"}</td>
                    <td className="px-4 py-3 text-xs">
                      <div>{reg.phone}</div>
                      {reg.whatsapp && (
                        <div className="text-muted-foreground">{reg.whatsapp}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="font-semibold">
                        {reg.tshirt_size}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full border border-border/40"
                          style={{ backgroundColor: colorMap[reg.tshirt_color] || "#888" }}
                        />
                        {reg.tshirt_color}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {reg.football === "Oui" ? (
                        <Badge className="text-xs">
                          ⚽ {reg.foot_level || "Oui"}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Non
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{reg.arrival || "—"}</td>
                    <td className="px-4 py-3 text-[11px] text-muted-foreground/60">
                      {new Date(reg.created_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
