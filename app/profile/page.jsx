"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

export default function ProfilePage() {
  const { user, logout, router } = useAppContext();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
