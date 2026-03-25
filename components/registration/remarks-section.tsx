"use client";

import { Label } from "@/components/ui/label";
import { FormSection } from "./form-section";
import { FiMessageSquare } from "react-icons/fi";

interface RemarksSectionProps {
  remarks: string;
  setRemarks: (value: string) => void;
}

export function RemarksSection({ remarks, setRemarks }: RemarksSectionProps) {
  return (
    <FormSection icon={<FiMessageSquare />} title="Remarques & Suggestions">
      <div className="space-y-2">
        <Label htmlFor="remarks">Votre message (optionnel)</Label>
        <textarea
          id="remarks"
          placeholder="Partagez toute remarque ou suggestion…"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={4}
          className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
        />
      </div>
    </FormSection>
  );
}
