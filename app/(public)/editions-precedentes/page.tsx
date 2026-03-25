"use client";

import { FiCalendar, FiFacebook } from "react-icons/fi";

export default function EditionsPrecedentesPage() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-primary/20 rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase text-primary mb-6 shadow-sm">
            <FiCalendar className="w-4 h-4" />
            Archives
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
            Éditions Précédentes
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revivez les moments forts des séminaires RHEMA passés et découvrez l'impact 
            de ces rassemblements sur notre communauté.
          </p>
        </div>
      </section>

      {/* Facebook Embed Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Séminaire RHEMA 2025
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Le 7ème Séminaire RHEMA a été un moment de grâce exceptionnelle où des centaines 
              de participants se sont rassemblés pour grandir ensemble dans la Parole et l'Esprit.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Enseignements puissants</h3>
                  <p className="text-sm text-muted-foreground">
                    Des messages transformateurs qui ont touché les cœurs et fortifié la foi
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Moments de communion</h3>
                  <p className="text-sm text-muted-foreground">
                    Des temps de partage et de fraternité qui ont renforcé l'unité du corps de Christ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Témoignages inspirants</h3>
                  <p className="text-sm text-muted-foreground">
                    Des vies transformées et des miracles qui ont manifesté la puissance de Dieu
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <FiFacebook className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">Suivez-nous sur Facebook</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Restez connectés pour ne rien manquer des actualités de l'EEAM et des 
                prochains événements RHEMA.
              </p>
            </div>
          </div>

          {/* Facebook Embed */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-border">
              <div className="bg-gradient-to-r from-primary to-secondary p-4">
                <h3 className="text-white font-bold text-center">
                  Publication Facebook - RHEMA 2025
                </h3>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="relative w-full" style={{ minHeight: '700px' }}>
                  <iframe 
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fweb.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02eR62rYwXNY7KLfz2nePvr3T42NYcWD2k7WhShszJM4efVsyv9RTosHGbFb9fTo2Sl%26id%3D100083183415660&show_text=true&width=500" 
                    width="100%" 
                    height="700" 
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Timeline */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Histoire des Séminaires RHEMA
          </h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { year: "2026", edition: "8ème", status: "À venir", description: "Casablanca - 15-17 Mai 2026" },
              { year: "2025", edition: "7ème", status: "Complété", description: "Un séminaire marqué par la présence de Dieu" },
              { year: "2024", edition: "6ème", status: "Complété", description: "Formation et croissance spirituelle" },
              { year: "2023", edition: "5ème", status: "Complété", description: "Renouveau et transformation" },
              { year: "2022", edition: "4ème", status: "Complété", description: "Fondements bibliques approfondis" },
              { year: "2021", edition: "3ème", status: "Complété", description: "Unité dans la diversité" },
              { year: "2020", edition: "2ème", status: "Complété", description: "Édification mutuelle" },
              { year: "2019", edition: "1ère", status: "Complété", description: "Le commencement d'une vision" },
            ].map((item, index) => (
              <div key={item.year} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                    item.status === "À venir" 
                      ? "bg-gradient-to-br from-primary to-secondary text-white" 
                      : "bg-white text-primary border-2 border-primary/20"
                  }`}>
                    {item.edition}
                  </div>
                  {index < 7 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-border to-transparent mt-2" />
                  )}
                </div>
                <div className={`flex-1 pb-8 ${
                  item.status === "À venir" 
                    ? "bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20" 
                    : "bg-white border border-border"
                } rounded-xl p-6 group-hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{item.year}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      item.status === "À venir"
                        ? "bg-primary text-white"
                        : "bg-secondary/20 text-secondary"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
