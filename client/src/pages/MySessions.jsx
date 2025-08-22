import { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../components/SessionCard";

export default function MySessions() {
  const [mySessions, setMySessions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/my-sessions`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMySessions(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Sessions</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {mySessions.map(s => (
          <SessionCard key={s._id} session={s} />
        ))}
      </div>
    </div>
  );
}
