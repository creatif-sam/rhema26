"use client";

import Link from "next/link";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="mt-auto bg-primary border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-sm mb-3 text-white">Contact</h3>
            <a 
              href="mailto:heeamnational@gmail.com"
              className="flex items-center justify-center md:justify-start gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <FiMail className="w-4 h-4" />
              heeamnational@gmail.com
            </a>
          </div>

          {/* Branding */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h2 className="font-extrabold text-xl tracking-tight text-white">
                RHEMA <span className="text-secondary">2026</span>
              </h2>
              <p className="text-xs text-white/80 mt-1">
                Séminaire National - Février 2026
              </p>
            </Link>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-sm mb-3 text-white">Suivez-nous</h3>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <a
                href="https://web.facebook.com/profile.php?id=100083183415660&_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-primary flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Facebook HEEAM"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/heeam_national"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-secondary flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Instagram HEEAM"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <p>© 2026 HEEAM National. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-white transition-colors">
              Espace Administration
            </Link>
            <span>•</span>
            <a 
              href="https://egliseevangeliqueaumaroc.fr/#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              EEAM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
