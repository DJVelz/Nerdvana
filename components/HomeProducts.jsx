import React from "react";
import { useAppContext } from "@/context/AppContext";
import Carousel from "./Carousel";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14 w-full">
      <div className="w-full max-w-7xl px-4">
        <Carousel
        title="Products under $25"
        products={products.filter((p) => p.price < 25.0 || p.offerPrice < 25.0)}
      />

      <Carousel
        title="Prep for your next DnD session"
        products={products.filter((p) => p.category.includes("fantasy"))}
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
