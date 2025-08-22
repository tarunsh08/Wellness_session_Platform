import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/my-sessions/${id}`).then(res => setSession(res.data));
  }, [id]);

  if (!session) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{session.title}</h2>
      <p className="text-gray-600 mb-4">{session.type}</p>
      <p>{session.content}</p>
    </div>
  );
}
