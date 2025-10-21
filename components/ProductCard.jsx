'use client';
import React from 'react';
import { assets } from '@/public/assets/assets';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
  const { currency, router, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product.id);
  };

  return (
    <div
      onClick={() => { router.push('/product/' + product.id); scrollTo(0, 0); }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      <div className="relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center group">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
        />
        <button onClick={handleWishlistToggle} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <Image
            className="h-3 w-3"
            src={isInWishlist(product.id) ? assets.heart_filled_icon : assets.heart_icon}
            alt="wishlist icon"
          />
        </button>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">{currency}{product.offerPrice}</p>
        <span className="text-base font-normal text-red-800/60 line-through ml-2">${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
