import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiClock, FiSettings } from "react-icons/fi";

export const dynamic = 'force-dynamic';

export default async function UserDashboardPage() {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6">
                <FiSettings className="w-10 h-10 text-orange-600 dark:text-orange-400 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">
                Tableau de Bord Utilisateur
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Bienvenue, {user.email}
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 text-orange-600 dark:text-orange-400">
                <FiClock className="w-6 h-6" />
                <p className="text-xl font-semibold">
                  En cours de développement
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Votre espace personnel est actuellement en construction. 
                  Nous travaillons activement pour vous offrir une expérience exceptionnelle.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vous serez notifié par email dès que votre tableau de bord sera disponible.
                </p>
              </div>

              <div className="pt-4">
                <a 
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                >
                  Retour à l'accueil
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
