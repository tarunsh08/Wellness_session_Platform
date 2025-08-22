import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateSession() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [sessionId, setSessionId] = useState(id);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isCreatingDraft = useRef(false);

  useEffect(() => {
    if (id) {
      const fetchSession = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/my-sessions/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const { title, type, content } = response.data;
          setTitle(title);
          setType(type);
          setContent(content);
        } catch (error) {
          console.error("Failed to fetch session:", error);
        }
      };
      fetchSession();
    }
  }, [id, token]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!title && !type && !content) return;

      const sessionData = { title, type, content };
      const headers = { Authorization: `Bearer ${token}` };

      try {
        if (sessionId) {
          await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/api/my-sessions/save-draft/${sessionId}`,
            sessionData,
            { headers }
          );
        } else if (!isCreatingDraft.current) {
          isCreatingDraft.current = true;
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/my-sessions/save-draft`,
            sessionData,
            { headers }
          );
          const newSessionId = response.data._id;
          setSessionId(newSessionId);
          navigate(`/create-session/${newSessionId}`, { replace: true });
        }
      } catch (error) {
        console.error("Failed to save draft:", error);
      } finally {
        if (!sessionId) {
          isCreatingDraft.current = false;
        }
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [title, type, content, sessionId, token, navigate]);

  const handlePublish = async () => {
    if (!sessionId) {
      alert("Please add some content before publishing.");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/my-sessions/publish/${sessionId}`,
        { title, type, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Session published!");
      navigate("/my-sessions");
    } catch (error) {
      console.error("Failed to publish session:", error);
      alert("Failed to publish session.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        {id ? "Edit Session" : "Create Session"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        placeholder="Type (Yoga, Meditation...)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <textarea
        placeholder="Content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
