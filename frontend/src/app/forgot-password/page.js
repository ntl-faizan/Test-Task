"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FaKey } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        { email }
      );
      setMsg("If your email exists, a reset link has been sent.");
    } catch {
      setError("Error sending reset link.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/95 p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <FaKey className="text-5xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Forgot Password
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
            {msg && <div className="text-green-600">{msg}</div>}
            {error && <div className="text-red-600">{error}</div>}
            <button className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}