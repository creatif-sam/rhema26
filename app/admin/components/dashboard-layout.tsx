"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "./admin-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  onExportCSV: () => void;
  onLogout: () => void;
}

export function DashboardLayout({ children, onExportCSV, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar onExportCSV={onExportCSV} onLogout={onLogout} />
      
      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
