'use client'
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";

const Wishlist = () => {
  const {
    products,
    router,
    getWishlistProducts
  } = useAppContext();

  const wishlistProducts = getWishlistProducts(products); 

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/product/${product._id}`)}
              className="flex items-center justify-between border-b pb-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={product.image[0]}
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
