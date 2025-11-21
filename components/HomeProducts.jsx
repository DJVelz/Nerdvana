"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import Carousel from "./Carousel";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14 w-full">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-16 lg:px-32 pt-6">
        <Carousel
        title="Products under $25"
        products={products.filter((p) => p.price < 25.0 || p.offerPrice < 25.0)}
      />

      <Carousel
        title="Prep for your next DnD session"
        products={products.filter((p) => p.category?.includes("fantasy"))}
      />

      <Carousel
        title="Excelsior! Find all things comics"
        products={products.filter((p) => p.category?.includes("comics"))}
      />

      </div>
      <button
        onClick={() => router.push("/all-products")}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition mt-8"
      >
        Shop all products
      </button>
    </div>
  );
};

export default HomeProducts;
