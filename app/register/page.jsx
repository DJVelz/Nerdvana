"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    // Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {display_name: username },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // If email confirmation is disabled or bypassed → user is logged in immediately
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80 bg-gray-100 p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-light_purple text-white p-2 rounded hover:bg-purple transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
