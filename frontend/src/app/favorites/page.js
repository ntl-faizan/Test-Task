"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FaTrash, FaHeart } from "react-icons/fa";

export default function FavoritesPage() {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFavorites(res.data));
  }, [token]);

  const removeFavorite = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Navbar />
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
          <FaHeart className="text-red-500" /> Your Favorites
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white/95 rounded-xl shadow-lg p-4 flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.movie?.posterPath || item.posterPath}`}
                alt={item.movie?.title || item.title}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="mt-3 font-bold text-lg text-gray-900 text-center">{item.movie?.title || item.title}</h3>
              <button
                className="mt-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={() => removeFavorite(item.id)}
                title="Remove from Favorites"
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}
          {favorites.length === 0 && (
            <div className="col-span-full text-center text-gray-300 text-lg">No favorites yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}