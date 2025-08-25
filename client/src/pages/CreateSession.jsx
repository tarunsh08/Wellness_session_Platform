import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateSession() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { id } = useParams();
  const [sessionId, setSessionId] = useState(id);
  const navigate = useNavigate();
  const token = localStorage.getItem("arvyax_token");
  const isCreatingDraft = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("arvyax_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
        setIsSaving(true);
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
        setIsSaving(false);
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
      setIsPublishing(true);
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/my-sessions/publish/${sessionId}`,
        { title, type, content },
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          } 
        }
      );
      navigate("/my-sessions");
    } catch (error) {
      console.error("Failed to publish session:", error);
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("arvyax_token");
        localStorage.removeItem("arvyax_user");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Failed to publish session.");
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const getWordCount = () => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent mb-2">
            {id ? "Edit Session" : "Create Session"}
          </h1>
          <p className="text-neutral-400">
            {id ? "Update your wellness session" : "Start creating your wellness session"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 mb-6">
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Session Title
            </label>
            <input
              type="text"
              placeholder="Enter a compelling title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-300"
            />
          </div>

          {/* Type Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Session Type
            </label>
            <input
              type="text"
              placeholder="e.g., Yoga, Meditation, Mindfulness, Breathing..."
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-300"
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-neutral-300">
                Session Content
              </label>
              <span className="text-xs text-neutral-500">
                {getWordCount()} words
              </span>
            </div>
            <textarea
              placeholder="Write your session content here... You can include instructions, guidance, or any relevant information for participants."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-300 min-h-40 resize-vertical"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-sm text-neutral-400">
            {isSaving ? (
              <div className="flex items-center">
                <div className="w-3 h-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </div>
            ) : (
              sessionId && (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Draft saved
                </div>
              )
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/my-sessions")}
              className="px-6 py-3 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || !sessionId}
              className="px-6 py-3 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-300 flex items-center"
            >
              {isPublishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Publish Session
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-neutral-800 border border-neutral-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-neutral-200 mb-3">Tips for creating great sessions:</h3>
          <ul className="text-neutral-400 text-sm space-y-2">
            <li>• Write clear and engaging titles</li>
            <li>• Specify the session type (Yoga, Meditation, etc.)</li>
            <li>• Provide detailed instructions for participants</li>
            <li>• Use descriptive language to create atmosphere</li>
            <li>• Save frequently - your work is auto-saved as draft</li>
          </ul>
        </div>
      </div>
    </div>
  );
}