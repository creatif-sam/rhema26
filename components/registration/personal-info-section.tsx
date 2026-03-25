"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "./form-section";
import { FiUser } from "react-icons/fi";

interface PersonalInfoSectionProps {
  fullname: string;
  setFullname: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  profession: string;
  setProfession: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  whatsapp: string;
  setWhatsapp: (value: string) => void;
  nationality: string;
  setNationality: (value: string) => void;
  idNumber: string;
  setIdNumber: (value: string) => void;
}

export function PersonalInfoSection({
  fullname,
  setFullname,
  city,
  setCity,
  profession,
  setProfession,
  age,
  setAge,
  phone,
  setPhone,
  whatsapp,
  setWhatsapp,
  nationality,
  setNationality,
  idNumber,
  setIdNumber,
}: PersonalInfoSectionProps) {
  return (
    <FormSection icon={<FiUser />} title="Informations Personnelles">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-full space-y-2">
          <Label htmlFor="fullname">
            Nom et Prénoms <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullname"
            type="text"
            placeholder="Ex : Jean-Baptiste KOUASSI"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">
            Nationalité <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nationality"
            type="text"
            placeholder="Ex : Ivoirienne"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber">
            Numéro CIN ou Passeport <span className="text-destructive">*</span>
          </Label>
          <Input
            id="idNumber"
            type="text"
            placeholder="Ex : AB123456"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">
            Ville de résidence <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Ex : Casablanca"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profession">
            Profession <span className="text-destructive">*</span>
          </Label>
          <Input
            id="profession"
            type="text"
            placeholder="Ex : Enseignant"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Âge</Label>
          <Input
            id="age"
            type="number"
            min="10"
            max="99"
            placeholder="Ex : 28"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Numéro joignable <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+212 6 00 00 00 00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">
            Numéro WhatsApp <span className="text-destructive">*</span>
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="+212 6 00 00 00 00"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </div>
      </div>
    </FormSection>
  );
}
