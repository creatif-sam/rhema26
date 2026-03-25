"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for unauthorized error from redirect
    if (searchParams.get("error") === "unauthorized") {
      setError("Accès refusé. Seuls les administrateurs peuvent accéder au tableau de bord.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Identifiants incorrects. Réessayez.");
        setIsLoading(false);
        return;
      }

      // Check if user has admin role
      if (data.user) {
        // First, ensure profile exists
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        // If profile doesn't exist, create it with user role
        if (!existingProfile) {
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({ id: data.user.id, role: "user" });
          
          if (insertError) {
            console.error("Error creating profile:", insertError);
          }
          
          await supabase.auth.signOut();
          setError("Votre profil a été créé. Contactez un administrateur pour obtenir l'accès.");
          setIsLoading(false);
          return;
        }

        // Check if user has admin role
        if (existingProfile.role !== "admin") {
          await supabase.auth.signOut();
          setError("Accès refusé. Seuls les administrateurs peuvent se connecter ici.");
          setIsLoading(false);
          return;
        }
      }

      // Add a small delay to ensure session is set
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force full page reload to ensure server sees the new session
      window.location.href = "/admin";
    } catch (err) {
      console.error("Login error:", err);
      setError("Une erreur s'est produite. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <CardHeader className="text-center pt-12 pb-8">
          <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
            🔐
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight">
            Administration
          </CardTitle>
          <CardDescription>
            Tableau de bord — Séminaire RHEMA 2026
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@eeam.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            {error && (
              <div className="text-sm text-destructive text-center">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full font-bold"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Connexion"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <Card className="w-full max-w-md">
          <CardContent className="pt-12 pb-8">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
