"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaFilm } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gray-900 text-white shadow">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <FaFilm className="text-blue-500" /> MovieApp
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        {user && (
          <>
            <Link href="/watchlist">Watchlist</Link>
            <Link href="/favorites">Favorites</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition">Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}