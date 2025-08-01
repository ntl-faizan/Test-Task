"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FaLock } from "react-icons/fa";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        { token, newPassword }
      );
      setMsg("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Reset failed. Token may be invalid or expired."
      );
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full bg-white/95 p-8 rounded-xl shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <FaLock className="text-5xl text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Invalid or missing token</h2>
            <p className="text-gray-700">Please use the link sent to your email.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/95 p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <FaLock className="text-5xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 bg-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            {msg && <div className="text-green-600">{msg}</div>}
            {error && <div className="text-red-600">{error}</div>}
            <button className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}