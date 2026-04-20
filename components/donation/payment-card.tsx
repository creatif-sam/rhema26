"use client";

import { useState } from "react";
import { FiCopy, FiCheck, FiClock } from "react-icons/fi";
import { toast } from "sonner";

export interface PaymentMethod {
  id: string;
  provider: string;
  country: string;
  flag: string;
  number: string;
  name?: string;
  swift?: string;
  accountNumber?: string;
  color: string;
  bgColor: string;
  description: string;
  region: "africa" | "maroc" | "europe";
  comingSoon?: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copié !");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Impossible de copier");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/60 hover:bg-white/90 border border-white/40 transition-all duration-200 font-medium shadow-sm"
    >
      {copied ? (
        <>
          <FiCheck className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-700">Copié</span>
        </>
      ) : (
        <>
          <FiCopy className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-700">Copier</span>
        </>
      )}
    </button>
  );
}

export function PaymentCard({ method }: { method: PaymentMethod }) {
  if (method.comingSoon) {
    return (
      <div
        className={`relative rounded-2xl p-6 border border-dashed border-border/60 bg-gradient-to-br ${method.bgColor}
          backdrop-blur-sm shadow-sm overflow-hidden opacity-70`}
      >
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">{method.flag}</span>
          <div>
            <p className="font-bold text-foreground text-sm leading-tight">{method.provider}</p>
            <p className="text-xs text-muted-foreground">{method.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/50 rounded-xl px-4 py-3 border border-white/40">
          <FiClock className="w-4 h-4 text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground">Bientôt disponible</p>
        </div>
        <p className="text-xs text-muted-foreground mt-3">{method.description}</p>
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded-2xl p-6 border border-border/60 bg-gradient-to-br ${method.bgColor}
        backdrop-blur-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      {/* Decorative circle */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-6 translate-x-6"
        style={{ backgroundColor: method.color }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{method.flag}</span>
          <div>
            <p className="font-bold text-foreground text-sm leading-tight">{method.provider}</p>
            <p className="text-xs text-muted-foreground">{method.country}</p>
          </div>
        </div>
        <div
          className="w-3 h-3 rounded-full ring-2 ring-white shadow-sm mt-1"
          style={{ backgroundColor: method.color }}
        />
      </div>

      {/* Number / identifier */}
      <div className="bg-white/60 rounded-xl px-4 py-3 mb-2 border border-white/40">
        <p className="text-xs text-muted-foreground mb-1">Numéro / Identifiant</p>
        <p className="font-mono font-bold text-foreground text-sm break-all">{method.number}</p>
      </div>

      {/* Name if present */}
      {method.name && (
        <div className="bg-white/50 rounded-xl px-4 py-2 mb-2 border border-white/40">
          <p className="text-xs text-muted-foreground mb-0.5">Nom du bénéficiaire</p>
          <p className="font-semibold text-foreground text-sm">{method.name}</p>
        </div>
      )}

      {/* Account number if different from main number */}
      {method.accountNumber && (
        <div className="bg-white/50 rounded-xl px-4 py-2 mb-2 border border-white/40">
          <p className="text-xs text-muted-foreground mb-0.5">N° de compte</p>
          <p className="font-mono font-semibold text-foreground text-sm">{method.accountNumber}</p>
        </div>
      )}

      {/* SWIFT if present */}
      {method.swift && (
        <div className="bg-white/50 rounded-xl px-4 py-2 mb-2 border border-white/40">
          <p className="text-xs text-muted-foreground mb-0.5">Code SWIFT</p>
          <p className="font-mono font-semibold text-foreground text-sm">{method.swift}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-muted-foreground flex-1 pr-2">{method.description}</p>
        <CopyButton text={method.number} />
      </div>
    </div>
  );
}
