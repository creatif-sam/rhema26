"use client";

import { useState, useEffect } from "react";
import { FiX, FiSmartphone, FiCreditCard, FiCamera, FiFileText, FiArrowRight } from "react-icons/fi";

const STEPS = [
  {
    number: 1,
    icon: FiSmartphone,
    title: "Choisir le moyen de paiement",
    description:
      "Identifiez le moyen adapté à votre pays ou région : MTN Mobile Money, Orange Money, Airtel Money, Virement bancaire marocain, ou autre.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    dot: "bg-yellow-400",
  },
  {
    number: 2,
    icon: FiCreditCard,
    title: "Effectuer le paiement",
    description:
      "Utilisez le numéro ou les coordonnées bancaires indiqués sur la carte correspondante pour réaliser votre don. Conservez la confirmation.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-400",
  },
  {
    number: 3,
    icon: FiCamera,
    title: "Photographiez votre reçu",
    description:
      "Prenez une capture d'écran ou une photo de la confirmation de votre paiement. Vous en aurez besoin pour l'étape suivante.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-400",
  },
  {
    number: 4,
    icon: FiFileText,
    title: "Remplir le formulaire",
    description:
      "Descendez en bas de cette page et remplissez le formulaire avec votre nom, pays, et la photo de votre reçu. Cela nous permet de confirmer et d'enregistrer votre don.",
    color: "text-primary",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-primary",
  },
];

interface ProcessModalProps {
  open: boolean;
  onClose: () => void;
  onGoToForm: () => void;
}

export function ProcessModal({ open, onClose, onGoToForm }: ProcessModalProps) {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (open) {
      setTimeout(() => setVisible(true), 10);
      setActiveStep(0);
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
      }, 600);
      return () => clearInterval(interval);
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const handleGoToForm = () => {
    onClose();
    setTimeout(onGoToForm, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto
          transition-all duration-500 ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border/40 flex items-center justify-between px-6 py-4 rounded-t-3xl z-10">
          <div>
            <h2 className="text-lg font-black text-foreground">Comment faire un don ?</h2>
            <p className="text-xs text-muted-foreground">4 étapes simples</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Steps */}
        <div className="px-6 py-6 space-y-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx <= activeStep;
            return (
              <div
                key={step.number}
                className={`flex gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                  isActive
                    ? `${step.bg} ${step.border} opacity-100 translate-x-0`
                    : "bg-muted/30 border-border/30 opacity-30 translate-x-4"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Step number */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive ? `${step.bg} ${step.border} ${step.color}` : "bg-muted border-border text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`w-0.5 h-4 rounded-full transition-all duration-300 ${isActive ? step.dot : "bg-border"}`} />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? step.color : "text-muted-foreground"}`}>
                      Étape {step.number}
                    </span>
                  </div>
                  <p className="font-bold text-sm text-foreground leading-tight mb-1">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="px-6 pb-6">
          <button
            onClick={handleGoToForm}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Aller au formulaire
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
