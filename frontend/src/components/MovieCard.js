"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState } from "react";

export default function MovieCard({ movie, onAction }) {
  const { user, token } = useAuth();
  const [favActive, setFavActive] = useState(false);
  const [watchActive, setWatchActive] = useState(false);

  const handleAction = async (type) => {
    if (!user) return alert("Login required");
    const endpoint = type === "favorite" ? "/favorites" : "/watchlist";
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        movieId: movie.id.toString(),
        title: movie.title,
        posterPath: movie.poster_path,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (type === "favorite") setFavActive(true);
    if (type === "watchlist") setWatchActive(true);
    if (onAction) onAction();
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-lg overflow-hidden w-64 hover:scale-105 transition-transform duration-200 border border-gray-200">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900">{movie.title}</h3>
        <div className="flex gap-4">
          <button
            className={`text-2xl ${favActive ? "text-red-600" : "text-gray-400"} hover:text-red-500 transition`}
            title="Add to Favorites"
            onClick={() => handleAction("favorite")}
          >
            {favActive ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            className={`text-2xl ${watchActive ? "text-blue-600" : "text-gray-400"} hover:text-blue-500 transition`}
            title="Add to Watchlist"
            onClick={() => handleAction("watchlist")}
          >
            {watchActive ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </div>
  );
}