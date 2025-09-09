import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Products under $30</p>
      <div className="w-16 h-0.5 bg-purple rounded-full"></div>
      <div className="flex gap-6 overflow-x-auto mt-6 pb-14 w-full scrollbar-hide">
        {products
          .filter(product => product.price < 30.0)
          .map((product, index) => (
            <div className="flex-shrink-0 w-64" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>

      <p className="text-2xl font-medium text-left w-full">Prep for the renfair</p>
      <div className="w-16 h-0.5 bg-purple rounded-full"></div>
      <div className="flex gap-6 overflow-x-auto mt-6 pb-14 w-full scrollbar-hide">
        {products
          .filter(product => product.category.includes("Medieval"))
          .map((product, index) => (
            <div className="flex-shrink-0 w-64" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      
      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        Shop all products
      </button>
    </div>
  );
};

export default HomeProducts;
