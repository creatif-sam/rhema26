"use client";

import { FormSection } from "./form-section";
import { ChipSelector } from "./chip-selector";
import { TbShirt } from "react-icons/tb";

interface TshirtSectionProps {
  tshirtSize: string;
  setTshirtSize: (value: string) => void;
  tshirtColor: string;
  setTshirtColor: (value: string) => void;
}

export function TshirtSection({
  tshirtSize,
  setTshirtSize,
  tshirtColor,
  setTshirtColor,
}: TshirtSectionProps) {
  return (
    <FormSection icon={<TbShirt />} title="Tee-shirt">
      <div className="space-y-6">
        <ChipSelector
          label="Taille"
          options={["S", "M", "L", "XL", "2XL", "3XL"]}
          value={tshirtSize}
          onChange={setTshirtSize}
          required
        />

        <ChipSelector
          label="Couleur"
          options={["Blanche", "Noire", "Bleu", "Rouge", "Vert"]}
          value={tshirtColor}
          onChange={setTshirtColor}
          required
        />
      </div>
    </FormSection>
  );
}
