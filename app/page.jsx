'use client'
import React from "react";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-16 lg:px-32">
        <HomeProducts />
      </div>
      <Footer />
    </>
  );
};

export default Home;
