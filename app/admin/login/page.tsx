import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If already logged in, check role and redirect
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/user-dashboard");
    }
  }

  // Redirect to the main login page
  redirect("/auth/login");
}

