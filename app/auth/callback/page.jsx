"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await supabase.auth.exchangeCodeForSession(window.location.href);
        router.push("/");
      } catch (error) {
        console.error("Error during magic link login:", error.message);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg">Signing you in...</p>
    </div>
  );
}
