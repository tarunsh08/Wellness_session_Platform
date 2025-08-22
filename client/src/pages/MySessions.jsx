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
        const token = localStorage.getItem("token");
        console.log('Fetching sessions...');
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/my-sessions`,
          {
            headers: { Authorization: `Bearer ${token}` },
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Sessions</h2>
        <Link
          to="/create-session"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Session
        </Link>
      </div>

      {sessions && sessions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions
            .filter(session => session && session._id)
            .map((session) => (
              <SessionCard key={session._id} session={session} />
            ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No sessions found.</p>
          <p className="text-sm text-gray-400 mt-2">Sessions data: {JSON.stringify(sessions)}</p>
        </div>
      )}
    </div>
  );
}
