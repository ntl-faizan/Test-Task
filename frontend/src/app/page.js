"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=7bd29f3264eeb540e7496fe9e1a8ff7a`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Navbar />
      <section className="py-12 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          Discover Popular Movies
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Browse and manage your favorites and watchlist
        </p>
      </section>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}