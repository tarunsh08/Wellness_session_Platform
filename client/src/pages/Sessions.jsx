import { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../components/SessionCard";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        console.log("Fetching sessions...");
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/sessions`);
        console.log("API Response:", response);
        console.log("Response data:", response.data);
        setSessions(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error details:", err.response || err.message);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <div className="p-6">Loading sessions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Wellness Sessions</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session} 
          />
        ))}
      </div>
    </div>
  );
}