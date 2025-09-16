"use client";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <>
            <Navbar/>
                <main className="flex flex-col items-center justify-center min-h-screen p-6">
                    <section className="text-center max-w-3xl mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple to-light_purple bg-clip-text text-transparent">
                    About Nerdvana
                    </h1>
                    <p className="max-w-xl text-center text-lg">
                        Nerdvana is an e-commerce platform built for fans of games, fantasy, and all things nerdy. 
                        Our mission is to create a space where enthusiasts can find unique products, 
                        connect with their passions, and support creators.
                    </p>
                    </section>
                </main>
            <Footer/>
        </>
    );
}