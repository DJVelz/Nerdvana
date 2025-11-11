import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react"

function Comments({ postId }) {
    const { user } = useAppContext();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from("comments")
            .select("id, content, created_at, user_id")
            .eq("post_id", postId)
            .order("created_at", { ascending:true });

        if (!error) setComments(data);
    };

    const addComment = async (e) => {
        e.preventDefault();
        if(!user) {
            alert("Please log in to comment!");
            return;
        }

        const { error } = await supabase.from("comments").insert([
            { post_id: postId, user_id: user.id, content: text },
        ]);

        if (!error) {
            setText("");
            fetchComments();
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="mt-4 border-t pt-3">
            <h3 className="font-medium mb-2">Comments</h3>
            {comments.map((c) => (
                <div key={c.id} className="mb-2">
                    <p>{c.content}</p>
                    <small className="text-gray-500">
                        {new Date(c.created_at).toLocaleString()}
                    </small>
                </div>
            ))}
        </div>
    )
}