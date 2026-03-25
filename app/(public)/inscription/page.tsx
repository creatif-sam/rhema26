"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RegistrationHero } from "@/components/registration/registration-hero";
import { PersonalInfoSection } from "@/components/registration/personal-info-section";
import { ServiceSection } from "@/components/registration/service-section";
import { LogisticsSection } from "@/components/registration/logistics-section";
import { FootballSection } from "@/components/registration/football-section";
import { TshirtSection } from "@/components/registration/tshirt-section";
import { RemarksSection } from "@/components/registration/remarks-section";
import { PrivacyPolicy } from "@/components/registration/privacy-policy";
import { SuccessMessage } from "@/components/registration/success-message";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Personal Info
  const [fullname, setFullname] = useState("");
  const [nationality, setNationality] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Service
  const [music, setMusic] = useState<"Oui" | "Non">("Non");
  const [musicRole, setMusicRole] = useState("");
  const [commission, setCommission] = useState<"Oui" | "Non">("Non");
  const [commissionName, setCommissionName] = useState("");

  // Logistics
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [accommodation, setAccommodation] = useState<"Oui" | "Non">("Non");

  // Football
  const [football, setFootball] = useState<"Oui" | "Non">("Non");
  const [footLevel, setFootLevel] = useState("");

  // T-shirt
  const [tshirtSize, setTshirtSize] = useState("");
  const [tshirtColor, setTshirtColor] = useState("");

  // Remarks
  const [remarks, setRemarks] = useState("");

  // Privacy Policy
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const resetForm = () => {
    setFullname("");
    setNationality("");
    setIdNumber("");
    setCity("");
    setProfession("");
    setAge("");
    setPhone("");
    setWhatsapp("");
    setMusic("Non");
    setMusicRole("");
    setCommission("Non");
    setCommissionName("");
    setArrival("");
    setDeparture("");
    setAccommodation("Non");
    setFootball("Non");
    setFootLevel("");
    setTshirtSize("");
    setTshirtColor("");
    setRemarks("");
    setPrivacyAccepted(false);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullname.trim()) {
      toast.error("Veuillez saisir votre nom et prénoms.");
      return;
    }
    if (!nationality.trim()) {
      toast.error("Veuillez indiquer votre nationalité.");
      return;
    }
    if (!idNumber.trim()) {
      toast.error("Veuillez saisir votre numéro CIN ou passeport.");
      return;
    }
    if (!city.trim()) {
      toast.error("Veuillez indiquer votre ville.");
      return;
    }
    if (!profession.trim()) {
      toast.error("Veuillez indiquer votre profession.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Veuillez saisir un numéro joignable.");
      return;
    }
    if (!arrival) {
      toast.error("Veuillez indiquer votre date d'arrivée.");
      return;
    }
    if (!departure) {
      toast.error("Veuillez indiquer votre date de départ.");
      return;
    }
    if (!tshirtSize) {
      toast.error("Veuillez choisir une taille de tee-shirt.");
      return;
    }
    if (!tshirtColor) {
      toast.error("Veuillez choisir une couleur de tee-shirt.");
      return;
    }
    if (!privacyAccepted) {
      toast.error("Veuillez accepter la politique de confidentialité.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("registrations").insert({
        fullname: fullname.trim(),
        nationality: nationality.trim(),
        id_number: idNumber.trim(),
        city: city.trim(),
        profession: profession.trim(),
        age: age ? parseInt(age) : null,
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || null,
        music,
        music_role: music === "Oui" ? musicRole.trim() : null,
        commission,
        commission_name: commission === "Oui" ? commissionName.trim() : null,
        arrival,
        departure,
        accommodation,
        football,
        foot_level: football === "Oui" ? footLevel : null,
        tshirt_size: tshirtSize,
        tshirt_color: tshirtColor,
        remarks: remarks.trim() || null,
      });

      if (error) throw error;

      toast.success("Inscription enregistrée avec succès !");
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <main className="min-h-screen flex flex-col pb-20 md:pb-0">
        <SuccessMessage onNewRegistration={resetForm} />
        <footer className="mt-auto w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-8 text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground transition-colors">
            Espace Administration
          </Link>
          <span>·</span>
          <span>RHEMA 2026</span>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col pb-20 md:pb-0">
      <RegistrationHero />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Formulaire d'Inscription
          </h2>
          <p className="text-sm text-muted-foreground">
            Remplissez tous les champs requis pour confirmer votre participation
          </p>
        </div>

        <form id="registration-form" onSubmit={handleSubmit} className="space-y-4">
          <PersonalInfoSection
            fullname={fullname}
            setFullname={setFullname}
            nationality={nationality}
            setNationality={setNationality}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
            city={city}
            setCity={setCity}
            profession={profession}
            setProfession={setProfession}
            age={age}
            setAge={setAge}
            phone={phone}
            setPhone={setPhone}
            whatsapp={whatsapp}
            setWhatsapp={setWhatsapp}
          />

          <ServiceSection
            music={music}
            setMusic={setMusic}
            musicRole={musicRole}
            setMusicRole={setMusicRole}
            commission={commission}
            setCommission={setCommission}
            commissionName={commissionName}
            setCommissionName={setCommissionName}
          />

          <LogisticsSection
            arrival={arrival}
            setArrival={setArrival}
            departure={departure}
            setDeparture={setDeparture}
            accommodation={accommodation}
            setAccommodation={setAccommodation}
          />

          <FootballSection
            football={football}
            setFootball={setFootball}
            footLevel={footLevel}
            setFootLevel={setFootLevel}
          />

          <TshirtSection
            tshirtSize={tshirtSize}
            setTshirtSize={setTshirtSize}
            tshirtColor={tshirtColor}
            setTshirtColor={setTshirtColor}
          />

          <RemarksSection remarks={remarks} setRemarks={setRemarks} />

          <PrivacyPolicy
            checked={privacyAccepted}
            onCheckedChange={setPrivacyAccepted}
          />

          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full text-base font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Confirmer mon inscription →"}
            </Button>
          </div>
        </form>
      </div>

      <footer className="mt-auto w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-8 text-muted-foreground">
        <Link href="/admin" className="hover:text-foreground transition-colors">
          Espace Administration
        </Link>
        <span>·</span>
        <span>RHEMA 2026</span>
      </footer>
    </main>
  );
}
