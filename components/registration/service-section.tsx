"use client";

import { Input } from "@/components/ui/input";
import { FormSection } from "./form-section";
import { YesNoToggle } from "./yes-no-toggle";
import { FiMusic } from "react-icons/fi";

interface ServiceSectionProps {
  music: "Oui" | "Non";
  setMusic: (value: "Oui" | "Non") => void;
  musicRole: string;
  setMusicRole: (value: string) => void;
  commission: "Oui" | "Non";
  setCommission: (value: "Oui" | "Non") => void;
  commissionName: string;
  setCommissionName: (value: string) => void;
}

export function ServiceSection({
  music,
  setMusic,
  musicRole,
  setMusicRole,
  commission,
  setCommission,
  commissionName,
  setCommissionName,
}: ServiceSectionProps) {
  return (
    <FormSection icon={<FiMusic />} title="Service dans la Paroisse">
      <div className="space-y-6">
        <YesNoToggle
          label="Servez-vous dans le groupe musical ?"
          value={music}
          onChange={setMusic}
          expandedContent={
            <Input
              type="text"
              placeholder="Poste (ex : guitariste, choriste…)"
              value={musicRole}
              onChange={(e) => setMusicRole(e.target.value)}
              className="w-full"
            />
          }
        />

        <YesNoToggle
          label="Servez-vous dans une autre commission ?"
          value={commission}
          onChange={setCommission}
          expandedContent={
            <Input
              type="text"
              placeholder="Laquelle ? (ex : Évangélisation, Accueil…)"
              value={commissionName}
              onChange={(e) => setCommissionName(e.target.value)}
              className="w-full"
            />
          }
        />
      </div>
    </FormSection>
  );
}
