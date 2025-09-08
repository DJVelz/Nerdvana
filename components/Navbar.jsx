"use client"
import React from "react";
import { assets} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-white bg-[#471396]">
      <Link href="/" className="hover:text-white transition">
          Nerdvana
        </Link>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-white transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-white transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-white transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-white transition">
          Contact
        </Link>

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <button className="flex items-center gap-2 hover:text-white transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <button className="flex items-center gap-2 hover:text-white transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;