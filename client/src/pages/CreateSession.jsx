import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateSession() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // Auto-save draft
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title || type || content) {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/my-sessions/save-draft`,
          { title, type, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [title, type, content]);

  const handlePublish = async () => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/my-sessions/publish`,
      { title, type, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Session published!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Create Session</h2>
      <input
        type="text" placeholder="Title"
        value={title} onChange={(e)=>setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text" placeholder="Type (Yoga, Meditation...)"
        value={type} onChange={(e)=>setType(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <textarea
        placeholder="Content..."
        value={content} onChange={(e)=>setContent(e.target.value)}
        className="w-full p-2 border rounded mb-3 h-40"
      />
      <button 
        onClick={handlePublish} 
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Publish
      </button>
    </div>
  );
}
