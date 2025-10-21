"use client";
import { useState } from "react";
import { assets } from "@/public/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: ""});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Collected data:", formData);
        alert(`Account created for ${formData.name} (${formData.email})`);
    };


    return(
        <>
            <Navbar/>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-2x1 font-bold mb-4">Create Account</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            className="border p-2 rounded"
                            required
                            />
                        <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                        />
                        <button type="submit" className="bg-light_purple text-white p-2 rounded hover:bg-purple">
                            Register
                        </button>
                    </form>
                </div>
            <Footer/>
        </>
    );
}