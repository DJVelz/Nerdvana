"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { user, logout, router } = useAppContext();
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
    toast.success(`Hi ${data.user.user_metadata?.display_name || "there"}! You're logged in!`);
    router.push("/user");
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
                className="ml-1 text-light_purple font-bold cursor-pointer hover:text-purple"
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>
          </>
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

          <p className="mb-2">
            <strong>Username:</strong>{" "}
            {user.user_metadata?.display_name || "No username"}
          </p>

          <p className="mb-6">
            <strong>Email:</strong> {user.email}
          </p>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
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
