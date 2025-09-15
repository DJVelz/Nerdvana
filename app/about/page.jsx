"use client";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <>
            <Navbar/>
                <main className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg p-8 text-center max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">About Nerdvana</h1>
                    <p className="max-w-xl text-center text-lg">
                        Nerdvana is an e-commerce platform built for fans of games, tech, and all things nerdy. 
                        Our mission is to create a space where enthusiasts can find unique products, 
                        connect with their passions, and support creators.
                    </p>
                </main>
            <Footer/>
        </>
    );
}