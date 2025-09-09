import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Products under $30</p>
      <div className="w-16 h-0.5 bg-gold rounded-full"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products
        .filter(product => product.price < 30.00)
        .map((product, index) => <ProductCard key={index} product={product} />)}
      </div>

      <p className="text-2xl font-medium text-left w-full">Prepare for the renaissance faire</p>
      <div className="w-16 h-0.5 bg-gold rounded-full"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products
        .filter(product => product.category.includes("Medieval"))
        .map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        Shop all products
      </button>
    </div>
  );
};

export default HomeProducts;
