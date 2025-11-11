import { useAppContext } from "@/context/AppContext"
import { useState } from "react"

function Comments({ postId }) {
    const { user } = useAppContext();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    
}