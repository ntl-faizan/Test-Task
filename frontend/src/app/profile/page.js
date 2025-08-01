"use client";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return <div className="text-center text-white mt-20">Please login</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 bg-white/95 p-8 rounded-xl shadow-lg flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-4 border-blue-600 shadow"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Your Profile</h2>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">User ID:</span> {user.userId}
        </div>
      </div>
    </div>
  );
}