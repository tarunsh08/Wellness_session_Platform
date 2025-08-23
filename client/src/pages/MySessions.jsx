import { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../components/SessionCard";
import { Link } from "react-router-dom";

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("arvyax_token");
        console.log('Fetching sessions...');
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/my-sessions`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        console.log('API Response:', response);
        console.log('Response data:', response.data);
        setSessions(response.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-neutral-600 border-t-neutral-100 rounded-full animate-spin"></div>
          <p className="text-neutral-400">Loading your sessions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

  return (
    <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="mb-6 sm:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent mb-2">
              My Sessions
            </h1>
            <p className="text-neutral-400">
              Manage and track your wellness sessions
            </p>
          </div>
          <Link
            to="/create-session"
            className="inline-flex items-center px-6 py-3 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Session
          </Link>
        </div>

        {/* Sessions Grid */}
        {sessions && sessions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sessions
              .filter(session => session && session._id)
              .map((session) => (
                <SessionCard key={session._id} session={session} />
              ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-800 border border-neutral-700 rounded-xl">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-semibold text-neutral-200 mb-2">No sessions yet</h3>
              <p className="text-neutral-400 mb-6">
                Create your first wellness session to get started on your journey.
              </p>
              <Link
                to="/create-session"
                className="inline-flex items-center px-6 py-2 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition-colors duration-300"
              >
                Create Your First Session
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}