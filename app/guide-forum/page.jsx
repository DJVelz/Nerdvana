import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
     {
    id: 1,
    title: "Welcome to the Forum!",
    content: "This is the very first post in the forum. Say hi 👋",
    comments: ["Hi there!", "Excited to be here!"],
  },
  {
    id: 2,
    title: "Favorite Programming Language?",
    content: "Share what languages you enjoy coding in the most!",
    comments: ["JavaScript all the way 🚀", "Python is the best for me."],
  },
];

const Forum = () => {
    return (
        <>
            <Navbar/>
                <main className="px-6 md:px-16 lg:px-32 py-8">
                    <h1 className="text-3x1 font-bold mb-6">Guide Forums</h1>
                    <p className="text-lg text-gray-700">
                        Welcome to the Nerdvana Guide Forums!
                        This is where users can share tips, guides, and discussion.
                    </p>
                </main>
            <Footer/>
        </>
    );
};

export default Forum;