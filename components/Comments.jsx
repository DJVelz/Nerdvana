'use client';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/context/AppContext";

export default function Comments({ postId }) {
  const { user } = useAppContext();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (!error) setComments(data || []);
    else console.error("Error fetching comments:", error);
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to comment!");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        post_id: postId,
        user_id: user.id,
        content: text,
        username: user.user_metadata?.display_name
      }
    ]);

    if (!error) {
      setText("");
      fetchComments();
    } else {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => { fetchComments(); }, [postId]);

  return (
    <div className="mt-4 pt-3">
      <h3 className="font-medium mb-2">Comments</h3>
      {comments.map((c) => (
        <div key={c.id} className="mb-2">
          <p>{c.content}</p>
          <p className="text-sm text-gray-500">
            <strong>{c.username || "Unknown"}</strong> – {new Date(c.created_at).toLocaleString()}
          </p>
        </div>
      ))}

      {user && (
        <form onSubmit={addComment} className="mt-3 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment."
            className="flex-1 p-2 border rounded"
          />
          <button type="submit" className="bg-gray-800 text-white px-3 py-1 rounded">
            Post
          </button>
        </form>
      )}
    </div>
  );
}
