"use client";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: ""});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("Account created!");
        } else {
            alert("Something went wrong.");
        }
    };

    
}