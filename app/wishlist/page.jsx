'use client'
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

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
      <div className="flex justify-center w-full px-4">
        <div className="flex flex-col gap-6 w-full max-w-5xl">
          {wishlistProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Info */}
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

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(productData._id)}
                  className="px-4 py-1 border rounded hover:bg-gray-100"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => { addToCart(productData._id); router.push('/cart') }} 
                  className="px-4 py-1 bg-gold text-white rounded hover:opacity-90"
                >
                  Buy Now
                </button>
              </div>
            </div>
            ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Wishlist;
