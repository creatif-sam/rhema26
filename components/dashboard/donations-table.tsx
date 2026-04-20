"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiHeart, FiSearch, FiExternalLink, FiDownload } from "react-icons/fi";

export interface Donation {
  id: string;
  created_at: string;
  name: string;
  country: string;
  payment_method: string | null;
  message: string | null;
  receipt_url: string | null;
}

interface DonationsTableProps {
  donations: Donation[];
}

const METHOD_COLORS: Record<string, string> = {
  "MTN Mobile Money (Bénin)": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Orange Money (Côte d'Ivoire)": "bg-orange-100 text-orange-800 border-orange-200",
  "Airtel Money (Gabon)": "bg-red-100 text-red-800 border-red-200",
  "Virement Bancaire (Maroc)": "bg-green-100 text-green-800 border-green-200",
  "Virement Bancaire (Europe)": "bg-blue-100 text-blue-800 border-blue-200",
};

export function DonationsTable({ donations }: DonationsTableProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Donation | null>(null);

  const filtered = donations.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      (d.payment_method || "").toLowerCase().includes(q)
    );
  });

  const handleExportCSV = () => {
    const headers = ["Date", "Nom", "Pays", "Moyen de paiement", "Message", "Reçu"];
    const rows = donations.map((d) => [
      new Date(d.created_at).toLocaleDateString("fr-FR"),
      d.name,
      d.country,
      d.payment_method || "",
      (d.message || "").replace(/,/g, ";"),
      d.receipt_url || "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rhema2026_dons_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card className="rounded-2xl border-border/40 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-sm font-bold flex items-center gap-2">
            <div className="w-0.5 h-3.5 bg-primary rounded-full" />
            Liste des dons ({donations.length})
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:flex-initial">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-52 pl-9 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <FiDownload className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Nom</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Pays</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Moyen</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Message</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Reçu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted-foreground py-12 text-sm">
                    Aucun don trouvé.
                  </td>
                </tr>
              )}
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className="hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(d.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{d.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{d.country}</td>
                  <td className="px-5 py-3.5">
                    {d.payment_method ? (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                          METHOD_COLORS[d.payment_method] ?? "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {d.payment_method}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[180px] truncate">
                    {d.message || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    {d.receipt_url ? (
                      <a
                        href={d.receipt_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-primary text-xs font-medium hover:underline"
                      >
                        Voir <FiExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/40">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12 text-sm">Aucun don trouvé.</p>
          )}
          {filtered.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelected(d)}
              className="p-4 hover:bg-muted/30 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="font-semibold text-sm text-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground shrink-0">
                  {new Date(d.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{d.country}</p>
              {d.payment_method && (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                    METHOD_COLORS[d.payment_method] ?? "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  {d.payment_method}
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FiHeart className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-base">Détail du don</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground text-lg leading-none transition-colors"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Row label="Nom" value={selected.name} />
              <Row label="Pays" value={selected.country} />
              <Row
                label="Date"
                value={new Date(selected.created_at).toLocaleDateString("fr-FR", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              />
              <Row label="Moyen de paiement" value={selected.payment_method || "—"} />
              <Row label="Message" value={selected.message || "—"} />
              {selected.receipt_url && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Reçu</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.receipt_url}
                    alt="Reçu de don"
                    className="w-full rounded-xl border border-border object-contain max-h-60 bg-muted/20"
                  />
                  <a
                    href={selected.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                  >
                    Ouvrir en plein écran <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}
