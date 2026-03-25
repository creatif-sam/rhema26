"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiHome, FiDownload, FiLogOut } from "react-icons/fi";

interface AdminNavigationProps {
  onExportCSV: () => void;
  onLogout: () => void;
}

export function AdminNavigation({ onExportCSV, onLogout }: AdminNavigationProps) {
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-border px-3 md:px-6 h-16 flex items-center justify-between gap-2 md:gap-4 shadow-sm">
      <div className="flex items-center gap-2 md:gap-4">
        <Image
          src="/logos/logo-EEAM.jpg"
          alt="EEAM Logo"
          width={40}
          height={40}
          className="rounded-lg hidden sm:block"
        />
        <div>
          <div className="font-black text-lg md:text-xl tracking-tight">
            RHEMA <span className="text-primary">Admin</span>
          </div>
          <div className="text-xs text-muted-foreground hidden sm:block">Tableau de bord administrateur</div>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <Link href="/">
          <Button variant="outline" size="sm" className="font-semibold">
            <FiHome className="w-4 h-4 md:mr-1.5" />
            <span className="hidden md:inline">Site Public</span>
          </Button>
        </Link>
        <Button onClick={onExportCSV} size="sm" className="font-semibold">
          <FiDownload className="w-4 h-4 md:mr-1.5" />
          <span className="hidden md:inline">Export CSV</span>
        </Button>
        <Button onClick={onLogout} variant="outline" size="sm" className="font-semibold">
          <FiLogOut className="w-4 h-4 md:mr-1.5" />
          <span className="hidden md:inline">Déconnexion</span>
        </Button>
        <Image
          src="/logos/rhema-logo.jpg"
          alt="RHEMA Logo"
          width={40}
          height={40}
          className="rounded-lg ml-2 hidden sm:block"
        />
      </div>
    </nav>
  );
}
