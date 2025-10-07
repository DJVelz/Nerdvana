'use client'
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

const Wishlist = () => {
  const {
    products,
    getWishlistProducts,
  } = useAppContext();

  const wishlistProducts = getWishlistProducts(products); 

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </>
  );
};

export default Wishlist;
