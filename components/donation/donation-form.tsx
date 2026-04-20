"use client";

import { useState, useRef } from "react";
import { FiUser, FiGlobe, FiImage, FiMessageSquare, FiSend, FiCheck, FiUpload, FiX } from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";

const PAYMENT_OPTIONS = [
  "MTN Mobile Money (Bénin)",
  "Orange Money (Côte d'Ivoire)",
  "Airtel Money (Gabon)",
  "Virement Bancaire (Maroc)",
  "Virement Bancaire (Europe)",
  "Autre",
];

interface FormState {
  name: string;
  country: string;
  paymentMethod: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  country: "",
  paymentMethod: "",
  message: "",
};

export function DonationForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 5 * 1024 * 1024) {
      setError("Le fichier ne doit pas dépasser 5 Mo.");
      return;
    }
    setFile(selected);
    setFilePreview(URL.createObjectURL(selected));
    setError(null);
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.country) {
      setError("Veuillez renseigner votre nom et votre pays.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      let receiptUrl: string | null = null;

      if (file) {
        const ext = file.name.split(".").pop();
        const path = `receipts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("donation-receipts")
          .upload(path, file, { upsert: false });

        if (uploadError) throw new Error("Erreur lors de l'envoi du reçu.");

        const { data: urlData } = supabase.storage.from("donation-receipts").getPublicUrl(path);
        receiptUrl = urlData.publicUrl;
      }

      const { error: dbError } = await supabase.from("donations").insert({
        name: form.name,
        country: form.country,
        payment_method: form.paymentMethod || null,
        message: form.message || null,
        receipt_url: receiptUrl,
      });

      if (dbError) throw new Error("Erreur lors de l'enregistrement. Veuillez réessayer.");

      setSuccess(true);
      setForm(INITIAL_STATE);
      removeFile();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-black text-foreground mb-2">Don enregistré !</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Merci pour votre générosité. Votre contribution est précieuse pour RHEMA 2026.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          Soumettre un autre don
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-foreground mb-2">Confirmer votre don</h2>
        <p className="text-sm text-muted-foreground">
          Remplissez ce formulaire après votre paiement pour que nous puissions enregistrer votre don.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1.5">
            <FiUser className="w-4 h-4 text-primary" />
            Nom complet *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Votre nom complet"
            required
            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1.5">
            <FiGlobe className="w-4 h-4 text-primary" />
            Pays *
          </label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Votre pays de résidence"
            required
            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Payment method */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1.5">
            <FiSend className="w-4 h-4 text-primary" />
            Moyen de paiement utilisé
          </label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          >
            <option value="">Sélectionner...</option>
            {PAYMENT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Receipt photo */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1.5">
            <FiImage className="w-4 h-4 text-primary" />
            Photo du reçu de paiement
          </label>
          {filePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={filePreview} alt="Reçu" className="w-full max-h-48 object-contain bg-muted/30" />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full flex flex-col items-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-muted-foreground"
            >
              <FiUpload className="w-6 h-6" />
              Cliquer pour ajouter une photo ou capture d'écran
              <span className="text-xs">JPG, PNG, WEBP – max 5 Mo</span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>

        {/* Message */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1.5">
            <FiMessageSquare className="w-4 h-4 text-primary" />
            Message (optionnel)
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Un message ou une note pour l'équipe..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 disabled:translate-y-0"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <FiSend className="w-4 h-4" />
              Soumettre mon don
            </>
          )}
        </button>
      </form>
    </div>
  );
}
