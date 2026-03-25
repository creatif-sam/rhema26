"use client";

import Image from "next/image";
import { useState } from "react";
import { FiUsers, FiTarget, FiBook, FiHeart } from "react-icons/fi";

const photos = [
  "/photos2025/photo1.jpg",
  "/photos2025/photo2.jpg",
  "/photos2025/photo3.jpg",
  "/photos2025/photo4.jpg",
  "/photos2025/photo5.jpg",
  "/photos2025/photo6.jpg",
  "/photos2025/photo7-overall.jpg",
  "/photos2025/photo8.jpg",
  "/photos2025/photo9.jpg",
];

export default function HEEAMPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          {photos.map((photo, index) => (
            <div
              key={photo}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === selectedPhoto ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={photo}
                alt={`HEEAM ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase text-white mb-6">
            <FiUsers className="w-4 h-4" />
            Département EEAM
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            HEEAM
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl font-medium">
            Hommes de l'Église Évangélique au Maroc
          </p>
        </div>

        {/* Photo indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedPhoto
                  ? "w-10 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Photo ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 mb-12 border border-primary/10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Notre Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Les Hommes de l'Eglise Evangélique au Maroc (HEEAM) est un des départements de l'EEAM 
            qui enseigne, forme les hommes de toutes les catégories à être des hommes équipés et 
            modèles pour l'avancement du Royaume de Dieu dans cette génération.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <FiTarget className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Formation</h3>
            <p className="text-muted-foreground">
              Des programmes de formation biblique et spirituelle adaptés à chaque profil d'homme, 
              pour développer un leadership authentique et serviteur.
            </p>
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-4">
              <FiBook className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Enseignement</h3>
            <p className="text-muted-foreground">
              Un enseignement biblique solide et pratique qui équipe les hommes pour vivre 
              pleinement leur foi au quotidien et dans leurs responsabilités.
            </p>
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <FiUsers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Communauté</h3>
            <p className="text-muted-foreground">
              Un espace de fraternité et d'entraide où les hommes se soutiennent mutuellement 
              dans leur croissance spirituelle et leurs défis personnels.
            </p>
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-4">
              <FiHeart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Modèles</h3>
            <p className="text-muted-foreground">
              Développer des hommes de caractère, intègres et passionnés, qui deviennent 
              des modèles dans leurs familles, églises et communautés.
            </p>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Galerie Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <button
                key={photo}
                onClick={() => setSelectedPhoto(index)}
                className="relative aspect-square rounded-xl overflow-hidden group border-2 border-border hover:border-primary transition-all"
              >
                <Image
                  src={photo}
                  alt={`HEEAM Photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rejoignez-nous au Séminaire RHEMA 2026
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Une occasion unique de formation, de croissance spirituelle et de fraternité 
            entre hommes engagés pour le Royaume de Dieu.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors shadow-lg"
          >
            S'inscrire maintenant
          </a>
        </div>
      </section>
    </div>
  );
}
