"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FaTrash, FaBookmark } from "react-icons/fa";

export default function WatchlistPage() {
  const { user, token } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/watchlist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWatchlist(res.data));
  }, [token]);

  const removeFromWatchlist = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Navbar />
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
          <FaBookmark className="text-blue-500" /> Your Watchlist
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {watchlist.map((item) => (
            <div key={item.id} className="bg-white/95 rounded-xl shadow-lg p-4 flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                alt={item.title}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="mt-3 font-bold text-lg text-gray-900 text-center">{item.title}</h3>
              <button
                className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => removeFromWatchlist(item.id)}
                title="Remove from Watchlist"
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}
          {watchlist.length === 0 && (
            <div className="col-span-full text-center text-gray-300 text-lg">No watchlist items yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}