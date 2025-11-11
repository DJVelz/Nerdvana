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

    
}