import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react"

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
}