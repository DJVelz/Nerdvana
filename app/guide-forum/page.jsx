import React from "react";
import Navbar from "@/components/Navbar";

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
        </>
    );
};

export default Forum;