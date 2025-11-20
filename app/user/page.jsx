"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

export default function LoginPage() {
  const { user, router } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">

        {!user ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Login</h1>

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 w-72 bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="bg-light_purple text-white p-2 rounded hover:bg-purple transition"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?
              <span
                className="ml-1 text-purple cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>
          </>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              You are logged in as:{" "}
              <span className="text-purple">
                {user.user_metadata?.display_name || user.email}
              </span>
            </h2>

            <button
              onClick={() => router.push("/profile")}
              className="bg-light_purple text-white px-4 py-2 rounded hover:bg-purple transition"
            >
              Go to Profile
            </button>
          </div>
        )}

        {message && (
          <p className="mt-4 text-red-500 text-center">{message}</p>
        )}
      </div>
      <Footer />
    </>
  );
}
