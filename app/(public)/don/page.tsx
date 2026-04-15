"use client";

import { useState, useEffect } from "react";
import { FiHeart, FiCopy, FiCheck, FiGlobe, FiSmartphone, FiCreditCard } from "react-icons/fi";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  provider: string;
  country: string;
  flag: string;
  number: string;
  color: string;
  bgColor: string;
  description: string;
  region: "africa" | "europe" | "america";
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "mtn",
    provider: "MTN Mobile Money",
    country: "Bénin",
    flag: "🇧🇯",
    number: "+229 67 00 00 00",
    color: "#FFCC00",
    bgColor: "from-yellow-400/20 to-yellow-500/10",
    description: "Mobile Money MTN – Bénin",
    region: "africa",
  },
  {
    id: "orange",
    provider: "Orange Money",
    country: "Côte d'Ivoire",
    flag: "🇨🇮",
    number: "+225 07 00 00 00",
    color: "#FF6600",
    bgColor: "from-orange-500/20 to-orange-600/10",
    description: "Orange Money – Côte d'Ivoire",
    region: "africa",
  },
  {
    id: "airtel",
    provider: "Airtel Money",
    country: "Gabon",
    flag: "🇬🇦",
    number: "+241 07 00 00 00",
    color: "#E4002B",
    bgColor: "from-red-500/20 to-red-600/10",
    description: "Airtel Money – Gabon",
    region: "africa",
  },
  {
    id: "virement",
    provider: "Virement Bancaire",
    country: "Europe",
    flag: "🇪🇺",
    number: "FR76 0000 0000 0000 0000 0000 000",
    color: "#003399",
    bgColor: "from-blue-700/20 to-blue-800/10",
    description: "IBAN – Pour les participants en Europe",
    region: "europe",
  },
  {
    id: "wise",
    provider: "Wise",
    country: "Amérique",
    flag: "🌎",
    number: "rhema2026@wise.com",
    color: "#9FE870",
    bgColor: "from-green-400/20 to-green-500/10",
    description: "Transfert Wise – Pour les participants en Amérique",
    region: "america",
  },
];

const regionLabels: Record<string, { label: string; icon: React.ElementType }> = {
  africa: { label: "Afrique – Mobile Money", icon: FiSmartphone },
  europe: { label: "Europe – Virement Bancaire", icon: FiCreditCard },
  america: { label: "Amérique – Wise", icon: FiGlobe },
};

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

function HeartParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <div
      className="absolute bottom-0 pointer-events-none animate-float-heart"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
    >
      <FiHeart
        className="text-primary/30"
        style={{ width: `${10 + Math.random() * 14}px`, height: `${10 + Math.random() * 14}px` }}
      />
    </div>
  );
}

export default function DonationPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const grouped = {
    africa: paymentMethods.filter((m) => m.region === "africa"),
    europe: paymentMethods.filter((m) => m.region === "europe"),
    america: paymentMethods.filter((m) => m.region === "america"),
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden pb-24 md:pb-8">
      {/* Floating hearts background */}
      {[...Array(12)].map((_, i) => (
        <HeartParticle key={i} delay={i * 0.6} x={(i * 8 + 4) % 100} />
      ))}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-[#8a1e2b] py-20 px-6 text-center">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

        <div
          className={`relative z-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-white mb-6">
            <FiHeart className="w-4 h-4 animate-pulse" />
            Collecte de Fonds
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Soutenir{" "}
            <span className="relative inline-block">
              RHEMA
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-white/40 rounded-full" />
            </span>{" "}
            2026
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Votre générosité contribue à faire de cet événement une bénédiction pour tous.
            Chaque contribution, grande ou petite, a un impact éternel.
          </p>

          <p className="text-white/70 text-sm italic max-w-xl mx-auto">
            « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ;
            car Dieu aime celui qui donne avec joie. » — 2 Corinthiens 9:7
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-white">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {(Object.keys(grouped) as Array<keyof typeof grouped>).map((region, regionIndex) => {
          const { label, icon: Icon } = regionLabels[region];
          const methods = grouped[region];
          return (
            <div
              key={region}
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + regionIndex * 150}ms` }}
            >
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{label}</h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Cards */}
              <div className={`grid gap-4 ${methods.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-1 max-w-lg"}`}>
                {methods.map((method, cardIndex) => (
                  <div
                    key={method.id}
                    className={`group relative rounded-2xl p-6 border border-border/60 bg-gradient-to-br ${method.bgColor} 
                      backdrop-blur-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                    style={{ transitionDelay: `${cardIndex * 80}ms` }}
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
                          <p className="font-bold text-foreground text-sm leading-tight">
                            {method.provider}
                          </p>
                          <p className="text-xs text-muted-foreground">{method.country}</p>
                        </div>
                      </div>
                      {/* Provider color dot */}
                      <div
                        className="w-3 h-3 rounded-full ring-2 ring-white shadow-sm mt-1"
                        style={{ backgroundColor: method.color }}
                      />
                    </div>

                    <div className="bg-white/60 rounded-xl px-4 py-3 mb-3 border border-white/40">
                      <p className="text-xs text-muted-foreground mb-1">Numéro / Identifiant</p>
                      <p className="font-mono font-bold text-foreground text-sm break-all">
                        {method.number}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground flex-1 pr-2">{method.description}</p>
                      <CopyButton text={method.number} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Note bas de page */}
        <div
          className={`text-center mt-8 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/60 rounded-full px-5 py-2.5 border border-border/60">
            <FiHeart className="w-4 h-4 text-primary animate-pulse" />
            Merci pour votre générosité et votre soutien à RHEMA 2026 !
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float-heart {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-80vh) scale(1.3);
            opacity: 0;
          }
        }
        .animate-float-heart {
          animation: float-heart linear infinite;
        }
      `}</style>
    </div>
  );
}
