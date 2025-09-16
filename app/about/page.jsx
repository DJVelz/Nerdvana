"use client";
import { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <>
            <Navbar/>
                <main className="flex flex-col items-center min-h-screen p-8 bg-gray-50 text-gray-800">
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

                    <section className="max-w-4xl grid md:grid-cols-2 gap-8 items-center mb-16">
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Our Story</h2>
                            <p className="leading-relaxed">
                                Born out of a passion project, Nerdvana started as a simple idea:
                                create a space where people can find unique, geeky products while
                                supporting indie creators and fellow fans. What began as a side
                                hustle is now growing into a community-driven platform.
                            </p>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={assets.lego}
                                alt="Nerdvana story image"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </section>

                    <section className="w-full max-w-5xl text-center">
                        <h2 className="text-2xl font-bold mb-10">Meet the Team</h2>
                        <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <img
                                src="https://placehold.co/150x150"
                                alt="Team member"
                                className="rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-lg font-semibold">Dereck Velez</h3>
                                <p className="text-sm text-gray-600">Founder, Developer, Designer & Marketing</p>
                            </div>
                        </div>
                    </section>
                </main>
            <Footer/>
        </>
    );
}