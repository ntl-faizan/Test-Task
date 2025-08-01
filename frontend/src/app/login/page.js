"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password }
      );
      login(res.data.accessToken);
      router.push("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/95 p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <FaUserCircle className="text-6xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-600">{error}</div>}
            <button className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-blue-600 underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}