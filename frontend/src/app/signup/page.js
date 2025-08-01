"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        name,
        password,
      });
      setMsg("Signup successful! Please login.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Signup failed. Try another email."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/95 p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <FaUserPlus className="text-5xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            {msg && <div className="text-green-600">{msg}</div>}
            {error && <div className="text-red-600">{error}</div>}
            <button className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition">
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-600 underline">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}