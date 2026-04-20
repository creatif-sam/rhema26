"use client";

import { useState, useEffect, useRef } from "react";
import { FiHeart, FiSmartphone, FiCreditCard, FiGlobe, FiList } from "react-icons/fi";
import { PaymentCard, PaymentMethod } from "@/components/donation/payment-card";
import { ProcessModal } from "@/components/donation/process-modal";
import { DonationForm } from "@/components/donation/donation-form";

const paymentMethods: PaymentMethod[] = [
  {
    id: "mtn",
    provider: "MTN Mobile Money",
    country: "Bénin",
    flag: "🇧🇯",
    number: "+229 01 62 45 55 49",
    name: "DAGBEMEY YANNICK F. AGNAN",
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
    number: "+225 07 08 89 13 28",
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
    number: "+241 077742931",
    name: "HAVELIN NOBLE",
    color: "#E4002B",
    bgColor: "from-red-500/20 to-red-600/10",
    description: "Airtel Money – Gabon",
    region: "africa",
  },
  {
    id: "maroc",
    provider: "Virement Bancaire",
    country: "Maroc",
    flag: "🇲🇦",
    number: "007480000187500030781908",
    name: "AKE ALFRED CORNEILLE DJOKOU",
    accountNumber: "000187V000307819",
    swift: "BCMAMAMC",
    color: "#C1272D",
    bgColor: "from-red-600/20 to-green-700/10",
    description: "RIB Marocain – Pour les participants au Maroc",
    region: "maroc",
  },
  {
    id: "europe",
    provider: "Virement Bancaire",
    country: "Europe",
    flag: "🇪🇺",
    number: "",
    comingSoon: true,
    color: "#003399",
    bgColor: "from-blue-700/20 to-blue-800/10",
    description: "IBAN – Pour les participants en Europe",
    region: "europe",
  },
];

const regionConfig: Record<string, { label: string; icon: React.ElementType }> = {
  africa: { label: "Afrique – Mobile Money", icon: FiSmartphone },
  maroc: { label: "Maroc – Virement Bancaire", icon: FiCreditCard },
  europe: { label: "Europe – Virement Bancaire", icon: FiGlobe },
};

function HeartParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <div
      className="absolute bottom-0 pointer-events-none animate-float-heart"
      style={{ left: `${x}%`, animationDelay: `${delay}s`, animationDuration: `${3 + (x % 2)}s` }}
    >
      <FiHeart
        className="text-primary/30"
        style={{ width: `${10 + (x % 14)}px`, height: `${10 + (x % 14)}px` }}
      />
    </div>
  );
}

export default function DonationPage() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const grouped = {
    africa: paymentMethods.filter((m) => m.region === "africa"),
    maroc: paymentMethods.filter((m) => m.region === "maroc"),
    europe: paymentMethods.filter((m) => m.region === "europe"),
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden pb-24 md:pb-8">
      {[...Array(12)].map((_, i) => (
        <HeartParticle key={i} delay={i * 0.6} x={(i * 8 + 4) % 100} />
      ))}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-[#8a1e2b] py-20 px-6 text-center">
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

          <p className="text-white/70 text-sm italic max-w-xl mx-auto mb-8">
            « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ;
            car Dieu aime celui qui donne avec joie. » — 2 Corinthiens 9:7
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-full shadow-lg hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200"
          >
            <FiList className="w-4 h-4" />
            Le Processus
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-white">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {(Object.keys(grouped) as Array<keyof typeof grouped>).map((region, regionIndex) => {
          const { label, icon: Icon } = regionConfig[region];
          const methods = grouped[region];
          return (
            <div
              key={region}
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + regionIndex * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{label}</h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className={`grid gap-4 ${methods.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-1 max-w-lg"}`}>
                {methods.map((method) => (
                  <PaymentCard key={method.id} method={method} />
                ))}
              </div>
            </div>
          );
        })}

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

      {/* Donation confirmation form */}
      <section ref={formRef} className="max-w-4xl mx-auto px-4 pb-16">
        <div className="border-t border-border/40 pt-12">
          <DonationForm />
        </div>
      </section>

      <ProcessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGoToForm={scrollToForm}
      />

      <style jsx global>{`
        @keyframes float-heart {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-80vh) scale(1.3); opacity: 0; }
        }
        .animate-float-heart { animation: float-heart linear infinite; }
      `}</style>
    </div>
  );
}
