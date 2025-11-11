"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // Fetch current user on load
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    getUser();

    // Listen for auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup listener on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setUser(null);
      setMessage("You have been logged out.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {!user ? (
          <>
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
          </>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              Logged in as <span className="text-purple">{user.email}</span>
            </h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
        )}

        {message && (
          <p className="mt-4 text-gray-700 text-center">{message}</p>
        )}
      </div>
      <Footer />
    </>
  );
}
