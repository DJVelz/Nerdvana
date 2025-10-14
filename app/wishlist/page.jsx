'use client'
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // TEMPORARY: use a test user ID until authentication is ready
  const testUserId = "your-test-user-uuid-here";

  // Fetch wishlist items with related product info
  const fetchWishlistProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        product_id,
        products(*)
      `)
      .eq("user_id", testUserId);

    if (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistProducts([]);
    } else {
      setWishlistProducts(data.map(item => item.products));
    }
    setLoading(false);
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
                  src={product.image_url}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">${product.offer_price}</p>
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
