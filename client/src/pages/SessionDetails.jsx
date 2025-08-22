import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/my-sessions/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSession(response.data);
      } catch (err) {
        console.error("Error fetching session:", err);
        setError("Failed to load session details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-neutral-600 border-t-neutral-100 rounded-full animate-spin"></div>
          <p className="text-neutral-400">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-8 text-center">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-neutral-200 mb-2">Session not found</h3>
            <p className="text-neutral-400">The requested session could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                session.status === 'published' 
                  ? 'bg-green-900/20 text-green-300 border border-green-700/50' 
                  : 'bg-yellow-900/20 text-yellow-300 border border-yellow-700/50'
              }`}>
                {session.status}
              </span>
            </div>
            <span className="text-sm text-neutral-400">
              {new Date(session.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            {session.title}
          </h1>
          
          <p className="text-neutral-300 text-lg mb-2">
            {session.type}
          </p>
        </div>

        {/* Content */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-8">
          <div className="prose prose-invert prose-neutral max-w-none">
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Session Content</h2>
            <div className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {session.content || (
                <p className="text-neutral-400 italic">No content available for this session.</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Details */}
        {session.description && (
          <div className="mt-6 bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-neutral-100 mb-3">Description</h3>
            <p className="text-neutral-300">{session.description}</p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-neutral-700 text-neutral-200 rounded-lg hover:bg-neutral-600 transition-colors duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Sessions
          </button>
        </div>
      </div>
    </div>
  );
}