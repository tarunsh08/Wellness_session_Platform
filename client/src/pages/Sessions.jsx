import { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../components/SessionCard";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        console.log("Fetching sessions...");
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/sessions`);
        console.log("API Response:", response);
        console.log("Response data:", response.data);
        const sessionsData = Array.isArray(response.data) ? response.data : [];
        setSessions(sessionsData);
        setFilteredSessions(sessionsData);
      } catch (err) {
        console.error("Error details:", err.response || err.message);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const filtered = sessions.filter(session =>
      session.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSessions(filtered);
  }, [searchTerm, sessions]);

  if (loading) return (
    <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-neutral-600 border-t-neutral-100 rounded-full animate-spin"></div>
            <p className="text-neutral-400 text-lg">Loading sessions...</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-200 text-lg">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent mb-4">
            Wellness Sessions
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Discover transformative wellness experiences designed to nurture your mind, body, and spirit.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search sessions by title, description, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-neutral-400">
            {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSessions.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-neutral-200 mb-2">No sessions found</h3>
              <p className="text-neutral-400">
                {searchTerm ? `No sessions match "${searchTerm}"` : 'No sessions available at the moment.'}
              </p>
            </div>
          </div>
        )}

        {/* Empty State when no search but no sessions */}
        {sessions.length === 0 && !searchTerm && (
          <div className="text-center py-16">
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold text-neutral-200 mb-2">No sessions available</h3>
              <p className="text-neutral-400">Check back later for new wellness sessions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}