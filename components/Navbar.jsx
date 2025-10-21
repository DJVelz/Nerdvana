"use client"
import React, { useState } from "react";
import { assets} from "@/public/assets/assets";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-300 text-white bg-purple">

      <div className="flex items-center md:hidden gap-3">
        <button 
          className="w-8 h-8 filter invert brightness-0 flex items-center gap-2 hover:text-white transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image src={assets.menu_icon} alt="menu icon" />
        </button>
      </div>

      <Link href="/" className="text-2xl font-bold hover:text-white transition">
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
        <Link href="/guide-forum" className="px-3 py-2 rounded-md transition-colors duration-200 hover:bg-light_purple hover:text-white transition">
          Guide Forums
        </Link>
        <Link href="/wishlist" className="p-2 rounded-md transition-colors duration-200 hover:bg-light_purple flex items-center justify-center hover:text-white">
          Wishlist
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
        <Link href="/all-products" className="p-2 rounded-md transition-colors duration-200 flex items-center justify-center hover:text-white">
          <Image src={assets.search_icon} alt="search icon" className="w-5 h-5" />
        </Link>
        <Link href="/user" className="p-2 rounded-md transition-colors duration-200 flex items-center justify-center hover:text-white">
          <Image src={assets.user_icon} alt="user icon" className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="p-2 rounded-md transition-colors duration-200 flex items-center justify-center hover:text-white">
          <Image src={assets.cart_icon} alt="cart icon" className="w-5 h-5" />
        </Link>
      </div>

      {isMenuOpen && (

        <div className="absolute top-full left-0 w-full bg-purple border-t border-gray-300 flex flex-col md:hidden z-50 shadow-lg transition-all">
          <Link href="/" className="px-6 py-3 hover:bg-light_purple" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/all-products" className="px-6 py-3 hover:bg-light_purple" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link href="/about" className="px-6 py-3 hover:bg-light_purple" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link href="/guide-forum" className="px-6 py-3 hover:bg-light_purple" onClick={() => setIsMenuOpen(false)}>Guide Forums</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;