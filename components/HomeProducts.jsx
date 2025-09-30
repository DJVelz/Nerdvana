import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { useRef } from "react";
import Carousel from "./Carousel";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14 max-w-screen-lg">
      <Carousel
        title="Products under $30"
        products={products.filter((p) => p.offerPrice < 30.0)}
      />

      <Carousel
        title="Prep for your next DnD session"
        products={products.filter((p) => p.category.includes("fantasy"))}
      />

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
