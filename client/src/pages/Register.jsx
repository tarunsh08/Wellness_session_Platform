import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, { name, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form 
        onSubmit={handleRegister} 
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input 
          type="name" placeholder="Name"
          value={name} onChange={(e)=>setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input 
          type="email" placeholder="Email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input 
          type="password" placeholder="Password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}
