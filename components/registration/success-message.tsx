"use client";

import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  onNewRegistration: () => void;
}

export function SuccessMessage({ onNewRegistration }: SuccessMessageProps) {
  return (
    <div className="max-w-xl mx-auto text-center py-20 px-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-4xl mx-auto mb-7 animate-in fade-in zoom-in duration-500">
        ✝️
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
        Inscription confirmée !
      </h2>

      <p className="text-muted-foreground leading-relaxed mb-8">
        Merci pour votre inscription au 8ème Séminaire RHEMA.
        <br />
        Que Dieu prépare votre cœur pour ces jours de grâce.
        <br />
        <br />
        À très bientôt à Casablanca 🙏
      </p>

      <Button
        onClick={onNewRegistration}
        size="lg"
        className="px-8"
      >
        Nouvelle inscription
      </Button>
    </div>
  );
}
