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
    title: "How to put together Lord of the Rings cosplay?",
    content: "I love lotr but figuring out what to get is overwhelming. Any help is appreciated!",
    comments: ["Check out the cloaks here in Nerdvana. That opens up all sorts of options for LOTR cosplays.", "We sell a really cool Fake Sting Sword, that is a must-have!"],
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
                    <section className="space-y-10">
                    {posts.map((post) => (
                        <div
                        key={post.id}
                        className="bg-white shadow rounded-xl p-4 space-y-3"
                        >
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700">{post.content}</p>

                        <div className="border-t pt-3 space-y-2">
                            <h3 className="text-sm font-medium text-gray-600">Comments</h3>
                            {post.comments.length > 0 ? (
                            <ul className="space-y-1">
                                {post.comments.map((comment, idx) => (
                                <li
                                    key={idx}
                                    className="bg-gray-100 rounded-lg p-2 text-sm"
                                >
                                    {comment}
                                </li>
                                ))}
                            </ul>
                            ) : (
                            <p className="text-sm text-gray-500">No comments yet.</p>
                            )}
                        </div>
                        </div>
                    ))}
                    </section>
                </main>
            <Footer/>
        </>
    );
};

export default Forum;