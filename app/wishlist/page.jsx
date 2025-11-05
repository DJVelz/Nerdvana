'use client'
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { userData } = useAppContext();

  // Fetch wishlist items with related product info
  const fetchWishlistProducts = async () => {
  setLoading(true);

  try {
    if (!userData?.id) {
       setLoading(false);
       return;
    }

    useEffect(() => {
      if (userData === null) {
        router.push("/user");
      }
    }, [userData]);
    const userId = userData.id;

    const { data, error } = await supabase
      .from("wishlist")
      .select("id, product_id, products(*)")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistProducts([]);
    } else if (!data || data.length === 0) {
      // No items in wishlist
      setWishlistProducts([]);
    } else {
      // Map to only products
      setWishlistProducts(data.map((item) => item.products));
    }
  } catch (err) {
    console.error("Unexpected error fetching wishlist:", err);
    setWishlistProducts([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchWishlistProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="flex items-center justify-between border-b pb-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">${product.offerPrice}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
