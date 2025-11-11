'use client';
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/context/AppContext";
import Comments from "@/components/Comments.jsx";

export default function Forum() {
  const { user } = useAppContext(); // get current logged-in user
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, created_at, user_id")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  // Add new post
  const createPost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to create a post.");
      return;
    }

    const { error } = await supabase.from("posts").insert([
      { user_id: user.id, title, content },
    ]);

    if (error) {
      console.error("Error creating post:", error);
    } else {
      setTitle("");
      setContent("");
      fetchPosts(); // refresh list
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Hero
        title="Explore the"
        highlight="Guide Forums"
        subtitle="Welcome to the Nerdvana Guide Forums! Share your tips, guides, and discussions with the community."
      />

      <main className="px-6 md:px-16 lg:px-32 py-8">
        {/* Create new post form */}
        {user && (
          <form
            onSubmit={createPost}
            className="bg-white shadow rounded-xl p-6 mb-10 space-y-4"
          >
            <h2 className="text-2xl font-semibold">Create a New Post</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your guide, tip, or discussion..."
              required
              rows="4"
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-light_purple hover:bg-purple text-white py-2 px-4 rounded"
            >
              Post
            </button>
          </form>
        )}

        {/* Display posts */}
        <section className="space-y-10">
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">No posts yet. Be the first to share!</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow rounded-xl p-4 space-y-3"
              >
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                <p className="text-xs text-gray-400">
                  Posted {new Date(post.created_at).toLocaleString()}
                </p>

                {/* Comments section */}
                <div className="border-t pt-3">
                  <Comments postId={post.id} />
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
