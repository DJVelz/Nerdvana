"use client";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <>
            <Navbar/>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg p-8 text-center max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">About Nerdvana</h1>
                    <p>
                        Nerdvana is a passion project combining technology and fandom culture. 
                        We aim to bring together the best of nerd culture into a one-stop shop. 
                        Built with Next.js and deployed on Vercel.
                    </p>
                </div>
            <Footer/>
        </>
    );
}