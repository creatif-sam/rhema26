"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FiMenu, 
  FiX, 
  FiEdit, 
  FiLogIn,
  FiHome,
  FiUsers,
  FiCalendar,
  FiHeart
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HEEAM", href: "/heeam", icon: FiUsers },
    { label: "Éditions Précédentes", href: "/editions-precedentes", icon: FiCalendar },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Logo */}
            <div className="flex items-center gap-4">
              <Image
                src="/logos/logo-EEAM.jpg"
                alt="EEAM Logo"
                width={45}
                height={45}
                className="rounded-lg"
              />
              <Link href="/" className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight">
                  RHEMA <span className="text-primary">2026</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link href="/don">
                <Button
                  size="sm"
                  className="ml-2 bg-rose-500 hover:bg-rose-600 text-white border-0"
                >
                  <FiHeart className="w-4 h-4 mr-1.5 fill-white" />
                  Faire un Don
                </Button>
              </Link>

              <Link href="/">
                <Button size="sm" className="ml-2">
                  <FiEdit className="w-4 h-4 mr-1.5" />
                  S'inscrire
                </Button>
              </Link>
              
              <Link href="/auth/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 w-9 h-9 p-0"
                  aria-label="Se connecter"
                >
                  <FiLogIn className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right Logo */}
            <Image
              src="/logos/rhema-logo.jpg"
              alt="RHEMA Logo"
              width={45}
              height={45}
              className="rounded-lg"
            />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent/10"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/don">
                <Button
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white border-0"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiHeart className="w-4 h-4 mr-1.5 fill-white" />
                  Faire un Don
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full" size="sm" onClick={() => setMobileMenuOpen(false)}>
                  <FiEdit className="w-4 h-4 mr-1.5" />
                  S'inscrire
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full" size="sm" onClick={() => setMobileMenuOpen(false)}>
                  <FiLogIn className="w-4 h-4 mr-1.5" />
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-border shadow-lg">
        <div className="grid grid-cols-6 gap-0.5 p-1.5">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === "/"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
            )}
          >
            <FiHome className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Accueil</span>
          </Link>

          <Link
            href="/heeam"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === "/heeam"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
            )}
          >
            <FiUsers className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">HEEAM</span>
          </Link>

          <Link
            href="/don"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === "/don"
                ? "text-rose-500 bg-rose-50"
                : "text-muted-foreground hover:text-rose-500 hover:bg-rose-50"
            )}
          >
            <FiHeart
              className={cn(
                "w-5 h-5 mb-0.5",
                pathname === "/don" ? "fill-rose-500 text-rose-500" : ""
              )}
            />
            <span className="text-[10px] font-medium">Don</span>
          </Link>

          <Link
            href="/#registration-form"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === "/" || pathname === "/inscription"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
            )}
          >
            <FiEdit className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Inscription</span>
          </Link>

          <Link
            href="/editions-precedentes"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === "/editions-precedentes"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
            )}
          >
            <FiCalendar className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Éditions</span>
          </Link>

          <Link
            href="/auth/login"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === "/auth/login"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
            )}
          >
            <FiLogIn className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Connexion</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
