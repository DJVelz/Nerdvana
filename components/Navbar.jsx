"use client"
import React from "react";
import { assets} from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {

  const { getCartCount } = useAppContext;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-300 text-white bg-purple">

      <div className="flex items-center md:hidden gap-3">
        <button className="w-8 h-8 filter invert brightness-0 flex items-center gap-2 hover:text-white transition">
        <Image src={assets.menu_icon} alt="menu icon" />
        </button>
      </div>

      <Link href="/" className="text-3x1 font-bold hover:text-white transition">
          Nerdvana
        </Link>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="px-3 py-2 rounded-md transition-colors duration-200 hover:bg-light_purple hover:text-white transition">
          Home
        </Link>
        <Link href="/all-products" className="px-3 py-2 rounded-md transition-colors duration-200 hover:bg-light_purple hover:text-white transition">
          Shop
        </Link>
        <Link href="/about" className="px-3 py-2 rounded-md transition-colors duration-200 hover:bg-light_purple hover:text-white transition">
          About Us
        </Link>
        <Link href="/" className="px-3 py-2 rounded-md transition-colors duration-200 hover:bg-light_purple hover:text-white transition">
          Guide Forums
        </Link>
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <Link href="/all-products" className="p-2 rounded-md transition-colors duration-200 hover:bg-light_purple flex items-center justify-center hover:text-white">
          <Image src={assets.search_icon} alt="search icon" className="w-5 h-5" />
        </Link>
        <Link href="/user" className="p-2 rounded-md transition-colors duration-200 hover:bg-light_purple flex items-center justify-center hover:text-white">
          <Image src={assets.user_icon} alt="user icon" className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="p-2 rounded-md transition-colors duration-200 hover:bg-light_purple flex items-center justify-center hover:text-white">
          <Image src={assets.cart_icon} alt="cart icon" className="w-5 h-5" />
        </Link>
      </ul>


      <div className="flex items-center md:hidden gap-3">
        <Link href="/all-products" className="p-2 rounded-md transition-colors duration-200 hover:bg-light_purple flex items-center justify-center hover:text-white">
          <Image src={assets.search_icon} alt="search icon" className="w-5 h-5" />
        </Link>
        <Link href="/user" className="p-2 rounded-md transition-colors duration-200 hover:bg-light_purple flex items-center justify-center hover:text-white">
          <Image src={assets.user_icon} alt="user icon" className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="p-2 rounded-md transition-colors duration-200 hover:bg-light_purple flex items-center justify-center hover:text-white">
          <Image src={assets.cart_icon} alt="cart icon" className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;