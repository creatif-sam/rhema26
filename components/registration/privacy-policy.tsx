"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FiShield } from "react-icons/fi";

interface PrivacyPolicyProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function PrivacyPolicy({ checked, onCheckedChange }: PrivacyPolicyProps) {
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  return (
    <Card className="mt-6">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-start gap-3">
          <div className="flex items-center h-5">
            <Checkbox 
              id="privacy-policy" 
              checked={checked}
              onCheckedChange={onCheckedChange}
              required
            />
          </div>
          <div className="flex-1">
            <Label
              htmlFor="privacy-policy"
              className="text-sm font-medium leading-relaxed cursor-pointer"
            >
              <span className="flex items-center gap-2 mb-2">
                <FiShield className="w-4 h-4 text-primary" />
                Politique de confidentialité <span className="text-destructive">*</span>
              </span>
              <span className="text-xs text-muted-foreground font-normal">
                J'accepte que mes données personnelles soient collectées et traitées par HEEAM dans le cadre de mon inscription au Séminaire RHEMA 2026.{" "}
                <button
                  type="button"
                  onClick={() => setShowFullPolicy(!showFullPolicy)}
                  className="text-primary hover:underline font-medium"
                >
                  {showFullPolicy ? "Voir moins" : "Lire la politique complète"}
                </button>
              </span>
            </Label>

            {showFullPolicy && (
              <div className="mt-4 p-4 bg-secondary/5 rounded-lg text-xs text-muted-foreground space-y-3 border border-border/50">
                <h4 className="font-bold text-sm text-foreground">Politique de Protection des Données Personnelles</h4>
                
                <div>
                  <p className="font-semibold text-foreground mb-1">1. Collecte des données</p>
                  <p>
                    HEEAM (Hommes et Espoir de l'Église Évangélique Au Maroc) collecte vos données personnelles (nom, prénom, ville, profession, âge, numéro de téléphone, WhatsApp, nationalité, numéro CIN/passeport) dans le cadre de votre inscription au 8ème Séminaire RHEMA 2026.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">2. Finalité du traitement</p>
                  <p>
                    Les données collectées sont utilisées exclusivement pour :
                  </p>
                  <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
                    <li>Gérer votre inscription au séminaire</li>
                    <li>Organiser la logistique (hébergement, transport, repas, tee-shirts)</li>
                    <li>Vous communiquer des informations relatives à l'événement</li>
                    <li>Établir des statistiques anonymes</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">3. Conservation des données</p>
                  <p>
                    Vos données personnelles seront conservées pendant une durée de 2 ans à compter de la fin du séminaire, sauf obligation légale contraire.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">4. Sécurité</p>
                  <p>
                    HEEAM met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre toute destruction accidentelle, perte, altération, divulgation ou accès non autorisé.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">5. Droits des personnes concernées</p>
                  <p>
                    Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
                    <li>Droit d'accès à vos données personnelles</li>
                    <li>Droit de rectification en cas d'inexactitude</li>
                    <li>Droit d'opposition au traitement</li>
                    <li>Droit à l'effacement de vos données</li>
                  </ul>
                  <p className="mt-2">
                    Pour exercer vos droits, vous pouvez nous contacter à l'adresse : <span className="font-medium text-primary">heeamnational@gmail.com</span>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">6. Partage des données</p>
                  <p>
                    Vos données ne seront en aucun cas vendues, échangées ou louées à des tiers. Elles pourront uniquement être partagées avec les partenaires logistiques du séminaire (hôtels, transporteurs) dans le strict cadre de l'organisation de l'événement.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">7. Cookies et technologies similaires</p>
                  <p>
                    Notre site utilise des cookies techniques nécessaires au bon fonctionnement du formulaire d'inscription. Aucun cookie de suivi ou publicitaire n'est utilisé.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">8. Modifications</p>
                  <p>
                    HEEAM se réserve le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur le site.
                  </p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-[11px]">
                    Dernière mise à jour : 25 mars 2026
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
