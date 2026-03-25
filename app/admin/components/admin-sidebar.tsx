"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  FiHome, 
  FiUsers, 
  FiBarChart2, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX,
  FiDownload,
  FiFilter
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

interface AdminSidebarProps {
  onExportCSV: () => void;
  onLogout: () => void;
}

const navigationItems = [
  { icon: <MdDashboard className="w-5 h-5" />, label: "Tableau de bord", href: "#dashboard", id: "dashboard" },
  { icon: <FiUsers className="w-5 h-5" />, label: "Inscrits", href: "#registrants", id: "registrants" },
  { icon: <FiBarChart2 className="w-5 h-5" />, label: "Statistiques", href: "#stats", id: "stats" },
  { icon: <FiFilter className="w-5 h-5" />, label: "Filtres", href: "#filters", id: "filters" },
];

export function AdminSidebar({ onExportCSV, onLogout }: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-white border-r border-border z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
            <Image
              src="/logos/logo-EEAM.jpg"
              alt="EEAM Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <div className="font-black text-lg tracking-tight">
                RHEMA <span className="text-primary">Admin</span>
              </div>
              <div className="text-xs text-muted-foreground">Dashboard</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="px-4 py-4 border-t border-border space-y-2">
            <Button 
              onClick={onExportCSV} 
              variant="outline" 
              size="sm" 
              className="w-full justify-start font-semibold"
            >
              <FiDownload className="w-4 h-4 mr-2" />
              Exporter CSV
            </Button>
            <Link href="/">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start font-semibold"
              >
                <FiHome className="w-4 h-4 mr-2" />
                Site Public
              </Button>
            </Link>
            <Button 
              onClick={onLogout} 
              variant="outline" 
              size="sm" 
              className="w-full justify-start font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logos/logo-EEAM.jpg"
            alt="EEAM Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <div className="font-black text-base tracking-tight">
            RHEMA <span className="text-primary">Admin</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-border z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
            <Image
              src="/logos/logo-EEAM.jpg"
              alt="EEAM Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <div className="font-black text-lg tracking-tight">
                RHEMA <span className="text-primary">Admin</span>
              </div>
              <div className="text-xs text-muted-foreground">Dashboard</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="px-4 py-4 border-t border-border space-y-2">
            <Button 
              onClick={() => {
                onExportCSV();
                setIsMobileMenuOpen(false);
              }} 
              variant="outline" 
              size="sm" 
              className="w-full justify-start font-semibold"
            >
              <FiDownload className="w-4 h-4 mr-2" />
              Exporter CSV
            </Button>
            <Link href="/">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start font-semibold"
              >
                <FiHome className="w-4 h-4 mr-2" />
                Site Public
              </Button>
            </Link>
            <Button 
              onClick={onLogout} 
              variant="outline" 
              size="sm" 
              className="w-full justify-start font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-2 py-2 flex items-center justify-around shadow-lg">
        {navigationItems.slice(0, 4).map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground"
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
          </a>
        ))}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground"
        >
          <FiMenu className="w-5 h-5" />
          <span className="text-[10px] font-medium">Menu</span>
        </button>
      </nav>
    </>
  );
}
