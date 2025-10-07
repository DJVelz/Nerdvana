'use client'
import React from "react";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero
        title="Welcome to"
        highlight="Nerdvana"
        subtitle="The ultimate community for gamers, geeks, and pop culture fans. Dive into forums, guides, and discussions with fellow nerds."
      />
      <div className="px-6 md:px-16 lg:px-32">
        <HomeProducts />
      </div>
      <Footer />
    </>
  );
};

export default Home;
