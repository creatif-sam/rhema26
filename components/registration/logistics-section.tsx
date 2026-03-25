"use client";

import { Label } from "@/components/ui/label";
import { FormSection } from "./form-section";
import { YesNoToggle } from "./yes-no-toggle";
import { FiCalendar } from "react-icons/fi";

interface LogisticsSectionProps {
  arrival: string;
  setArrival: (value: string) => void;
  departure: string;
  setDeparture: (value: string) => void;
  accommodation: "Oui" | "Non";
  setAccommodation: (value: "Oui" | "Non") => void;
}

export function LogisticsSection({
  arrival,
  setArrival,
  departure,
  setDeparture,
  accommodation,
  setAccommodation,
}: LogisticsSectionProps) {
  return (
    <FormSection icon={<FiCalendar />} title="Logistique & Présence">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="arrival">
            Arrivée prévue à Casablanca <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Séminaire débute vendredi 15 mai — enseignement 19h–21h
          </p>
          <select
            id="arrival"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            required
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          >
            <option value="">— Sélectionner —</option>
            <option value="Vendredi matin (avant 12h)">Vendredi matin (avant 12h)</option>
            <option value="Vendredi après-midi (12h – 18h)">Vendredi après-midi (12h – 18h)</option>
            <option value="Vendredi soir (18h – 19h)">Vendredi soir (18h – 19h)</option>
            <option value="Samedi matin">Samedi matin</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="departure">
            Départ prévu <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Fin officielle du séminaire : dimanche 17 mai
          </p>
          <select
            id="departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          >
            <option value="">— Sélectionner —</option>
            <option value="Dimanche après la clôture">Dimanche après la clôture</option>
            <option value="Dimanche soir">Dimanche soir</option>
            
          </select>
        </div>

        <div className="space-y-2">
          <YesNoToggle
            label="Comptez-vous profiter des solutions d'hébergement qui seront mises à disposition?"
            value={accommodation}
            onChange={setAccommodation}
          />
        </div>
      </div>
    </FormSection>
  );
}
