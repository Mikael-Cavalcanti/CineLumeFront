"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { VideosService } from "@/services/video/video.service";

interface CastMember {
  name: string;
  role: string;
  image?: string;
}

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);

  const videosService = new VideosService();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await videosService.findVideoById(+params.id); // método que retorna detalhes do filme
        setMovie(data);

        // Supondo que o cast venha como array dentro do filme
        setCast(data.cast || []);
      } catch (error) {
        console.error("Erro ao carregar detalhes do filme:", error);
      }
    };
    fetchMovie();
  }, [params.id]);

  if (!movie) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] relative">
      <Image
        src={movie.background || "/movie-detail-bg.png"}
        alt={movie.title}
        fill
        className="object-cover opacity-30"
        priority
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
        </div>

        <div className="px-6 pb-6">
          {/* Movie Info */}
          <div className="max-w-2xl space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
              <div className="flex items-center space-x-4 text-[#c5c5c5] mb-6">
                <span>{movie.year}</span>
                <span>{movie.ageRating}</span>
                <span>{movie.duration}</span>
                <span>{movie.quality}</span>
              </div>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">{movie.description}</p>

            <div className="flex space-x-4">
              <Button className="bg-white text-black hover:bg-white/90 px-8 py-3">
                <Play className="w-5 h-5 mr-2" />
                Watch now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                <Heart className="w-5 h-5 mr-2" />
                Add favorite
              </Button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Synopsis */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Sinopse</h2>
              <p className="text-white/80 leading-relaxed">{movie.description}</p>
            </div>

            {/* More Details */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">More details</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-[#c5c5c5]">Categories:</span>
                  <p className="text-white">{movie.categories?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-[#c5c5c5]">Audio:</span>
                  <p className="text-white">{movie.audio?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-[#c5c5c5]">Subtitled:</span>
                  <p className="text-white">{movie.subtitles?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-[#c5c5c5]">Awards:</span>
                  <p className="text-white">{movie.awards?.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cast */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            <div className="flex space-x-6 overflow-x-auto">
              {cast.map((actor, index) => (
                <div key={index} className="flex-shrink-0 text-center">
                  <Avatar className="w-20 h-20 mb-3">
                    <AvatarImage src={actor.image || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#1d1d1d] text-white">{actor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-white font-medium">{actor.name}</p>
                  <p className="text-[#c5c5c5] text-sm">{actor.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Direction and Production */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Direction and Production</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-2">Direction:</h3>
                <p className="text-[#c5c5c5]">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Script:</h3>
                <p className="text-[#c5c5c5]">{movie.script}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Production:</h3>
                <p className="text-[#c5c5c5]">{movie.production}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-24 pt-12 border-t border-[#1d1d1d]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feb625] rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">C</span>
                </div>
                <span className="text-white font-bold text-xl">CINELUME</span>
              </div>

              <div className="grid grid-cols-2 gap-8 text-sm">
                <div className="space-y-2">
                  <p className="text-[#c5c5c5]">About</p>
                  <p className="text-[#c5c5c5]">Support</p>
                  <p className="text-[#c5c5c5]">Merchants</p>
                  <p className="text-[#c5c5c5]">Partners</p>
                  <p className="text-[#c5c5c5]">Contact</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#c5c5c5]">Facebook</p>
                  <p className="text-[#c5c5c5]">Twitter</p>
                  <p className="text-[#c5c5c5]">LinkedIn</p>
                  <p className="text-[#c5c5c5]">Instagram</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#1d1d1d] text-center">
              <p className="text-[#787878] text-sm">© 2023 CineLume. All rights reserved</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
