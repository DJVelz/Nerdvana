"use client";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: ""});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    
}