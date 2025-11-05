"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Sending magic link...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Magic link sent! Check your email to log in.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-2xl font-bold mb-6">Sign In with Magic Link</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-72 bg-gray-100 p-6 rounded-lg shadow-md"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-light_purple text-white p-2 rounded hover:bg-purple transition"
          >
            Send Magic Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-gray-700 text-center">{message}</p>
        )}
      </div>
      <Footer />
    </>
  );
}
