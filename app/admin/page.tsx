import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboardClient } from "./admin-dashboard-client";

// Force dynamic rendering to prevent build-time data fetching errors
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Check if user has admin role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    // User is not an admin, redirect to login with error
    redirect("/admin/login?error=unauthorized");
  }

  // Fetch all registrations
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch page visits for analytics
  const { data: pageVisits } = await supabase
    .from("page_visits")
    .select("*")
    .order("visited_at", { ascending: false })
    .limit(1000); // Last 1000 visits

  if (error) {
    console.error("Error fetching registrations:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Erreur</h2>
          <p className="text-muted-foreground">
            Impossible de charger les données. Veuillez réessayer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboardClient 
      registrations={registrations || []} 
      pageVisits={pageVisits || []}
    />
  );
}
