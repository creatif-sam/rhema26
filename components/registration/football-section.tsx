"use client";

import { FormSection } from "./form-section";
import { YesNoToggle } from "./yes-no-toggle";
import { ChipSelector } from "./chip-selector";
import { IoFootballOutline } from "react-icons/io5";

interface FootballSectionProps {
  football: "Oui" | "Non";
  setFootball: (value: "Oui" | "Non") => void;
  footLevel: string;
  setFootLevel: (value: string) => void;
}

export function FootballSection({
  football,
  setFootball,
  footLevel,
  setFootLevel,
}: FootballSectionProps) {
  return (
    <FormSection icon={<IoFootballOutline />} title="Football">
      <YesNoToggle
        label="Jouez-vous au foot ?"
        value={football}
        onChange={setFootball}
        expandedContent={
          <ChipSelector
            label=""
            options={[
              "Niveau élevé",
              "Niveau intermédiaire",
              "Niveau loisir / amateur",
            ]}
            value={footLevel}
            onChange={setFootLevel}
          />
        }
      />
    </FormSection>
  );
}
