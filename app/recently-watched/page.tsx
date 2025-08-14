"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RecentlyWatchedService } from "@/services/recently-watched/recentlyWatched.service";

export default function RecentlyWatchedPage({ profileId }: { profileId: number }) {
  const [recentlyWatched, setRecentlyWatched] = useState<any[]>([]);
  const service = new RecentlyWatchedService();

  useEffect(() => {
    const fetchRecentlyWatched = async () => {
      try {
        const data = await service.getRecentlyWatched(profileId);
        setRecentlyWatched(data);
      } catch (error) {
        console.error("Erro ao carregar filmes assistidos recentemente:", error);
      }
    };

    fetchRecentlyWatched();
  }, [profileId]);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Sidebar />
      <Header />

      <main className="ml-16 pt-16 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Recently watched</h1>
            <p className="text-[#787878]">The films and series you saw recently</p>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyWatched.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-[#1a1a1a] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Favorite Heart Icon */}
                  {movie.isFavorite && (
                    <button className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-white font-semibold">{movie.title}</h3>
                  <p className="text-[#787878] text-sm">{movie.year}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-[#feb625] fill-[#feb625]" />
                    <span className="text-white text-sm">{movie.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
