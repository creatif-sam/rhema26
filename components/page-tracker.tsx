"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const supabase = createClient();
        
        // Get or create session ID
        let sessionId = sessionStorage.getItem("analytics_session");
        if (!sessionId) {
          sessionId = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
          sessionStorage.setItem("analytics_session", sessionId);
        }

        const { error } = await supabase.from("page_visits").insert({
          page_path: pathname,
          session_id: sessionId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
        });

        if (error) {
          console.error("Analytics tracking error:", error);
        }
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    };

    // Track after a short delay to ensure page is loaded
    const timeout = setTimeout(trackPageView, 1000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null; // This component renders nothing
}
