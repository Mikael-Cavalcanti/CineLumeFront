"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useGenres } from "@/hooks/use-genre"
import { useDashboard } from "@/hooks/use-dashboard"


const moviesByGenre = [
  { title: "Jurassic World", year: "2018", image: "/placeholder.svg?height=300&width=200" },
  { title: "Mission: Impossible The final Reckognition", year: "2025", 
    image: "/placeholder.svg?height=300&width=200" },
  { title: "Ballerina", year: "2000", image: "/placeholder.svg?height=300&width=200" },
  { title: "Karate Kid Legends", year: "2000", image: "/placeholder.svg?height=300&width=200" },
  { title: "Sonic 3", year: "2000", image: "/placeholder.svg?height=300&width=200" },
  { title: "Avengers", year: "2000", image: "/placeholder.svg?height=300&width=200" },
  { title: "Film Name", year: "2000", image: "/placeholder.svg?height=300&width=200" },
  { title: "Film Name", year: "2000", image: "/placeholder.svg?height=300&width=200" },
]

const continueWatching = [
  { title: "Jurassic World", progress: 75, image: "/placeholder.svg?height=200&width=300" },
  { title: "Avatar: The Way of Water", progress: 45, image: "/placeholder.svg?height=200&width=300" },
  { title: "Top Gun: Maverick", progress: 80, image: "/placeholder.svg?height=200&width=300" },
  { title: "Black Panther: Wakanda Forever", progress: 30, image: "/placeholder.svg?height=200&width=300" },
  { title: "Spider-Man: No Way Home", progress: 90, image: "/placeholder.svg?height=200&width=300" },
  { title: "The Batman", progress: 60, image: "/placeholder.svg?height=200&width=300" },
  { title: "Doctor Strange", progress: 25, image: "/placeholder.svg?height=200&width=300" },
  { title: "Thor: Love and Thunder", progress: 85, image: "/placeholder.svg?height=200&width=300" },
]

const topMovies = [
  { title: "Jurassic World", year: "2018", rank: 1, image: "/placeholder.svg?height=300&width=200" },
  { title: "Avatar", year: "2022", rank: 2, image: "/placeholder.svg?height=300&width=200" },
  { title: "Top Gun: Maverick", year: "2022", rank: 3, image: "/placeholder.svg?height=300&width=200" },
  { title: "Black Panther", year: "2022", rank: 4, image: "/placeholder.svg?height=300&width=200" },
  { title: "Spider-Man", year: "2021", rank: 5, image: "/placeholder.svg?height=300&width=200" },
  { title: "The Batman", year: "2022", rank: 6, image: "/placeholder.svg?height=300&width=200" },
  { title: "Doctor Strange", year: "2022", rank: 7, image: "/placeholder.svg?height=300&width=200" },
  { title: "Thor: Love and Thunder", year: "2022", rank: 8, image: "/placeholder.svg?height=300&width=200" },
  { title: "Minions: The Rise of Gru", year: "2022", rank: 9, image: "/placeholder.svg?height=300&width=200" },
  { title: "Lightyear", year: "2022", rank: 10, image: "/placeholder.svg?height=300&width=200" },
]

export default function DashboardPage() {
  const {
    genres,
    selectedGenre,
    setSelectedGenre,
    videos,
    loadingGenres,
    loadingVideos,
    error,
  } = useGenres()
  
  const { profileId } = useDashboard()

  // const [selectedGenre, setSelectedGenre] = useState("Action")
  const genreScrollRef = useRef<HTMLDivElement>(null)
  const movieScrollRef = useRef<HTMLDivElement>(null)
  const continueWatchingScrollRef = useRef<HTMLDivElement>(null)
  const topMoviesScrollRef = useRef<HTMLDivElement>(null)

  const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right", amount = 200) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -amount : amount
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleWheel = (e: React.WheelEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      e.preventDefault()
      ref.current.scrollLeft += e.deltaY
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Sidebar />
      <Header />

      <main className="ml-16 pt-16">
        {/* Hero Carousel Section */}
        <HeroCarousel />

        <div className="px-8 space-y-12">
          {/* Genre Filters */}
          <div className="flex items-center space-x-4">
            {/* Scrollable Categories Container */}
            <div className="flex-1 relative group">
              <div
                ref={genreScrollRef}
                className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide pr-4"
                onWheel={(e) => handleWheel(e, genreScrollRef)}
              >
                {genres.map((genre) => (
                  <Button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors shadow-sm flex-shrink-0 ${
                      selectedGenre?.id === genre.id
                        ? "bg-[#feb625] text-black hover:bg-[#feb625]/90"
                        : "bg-transparent border border-white text-white hover:bg-white/10"
                    }`}
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>

              {/* Genre Scroll Navigation Buttons */}
              <button
                onClick={() => scrollContainer(genreScrollRef, "left", 200)}
                className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-12 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollContainer(genreScrollRef, "right", 200)}
                className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-12 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Movie Cards by Genre */}
          <div className="space-y-4">
            <div className="relative group">
              <div
                ref={movieScrollRef}
                className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
                onWheel={(e) => handleWheel(e, movieScrollRef)}
              >
                {moviesByGenre.map((movie, index) => (
                  <div key={index} className="flex-shrink-0 space-y-3 group cursor-pointer">
                    <div className="w-40 h-60 bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        width={160}
                        height={240}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-white text-sm font-medium">{movie.title}</p>
                      <p className="text-gray-400 text-xs">{movie.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Movie Cards Scroll Navigation Buttons */}
              <button
                onClick={() => scrollContainer(movieScrollRef, "left", 250)}
                className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-16 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollContainer(movieScrollRef, "right", 250)}
                className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-16 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Continue Watching Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Continue watching</h2>
            <div className="relative group">
              <div
                ref={continueWatchingScrollRef}
                className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
                onWheel={(e) => handleWheel(e, continueWatchingScrollRef)}
              >
                {continueWatching.map((movie, index) => (
                  <div key={index} className="flex-shrink-0 w-80 group cursor-pointer">
                    <div className="relative aspect-video bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        width={320}
                        height={180}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-medium mb-2">{movie.title}</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-600 rounded-full h-1">
                            <div
                              className="bg-white rounded-full h-1 transition-all duration-300"
                              style={{ width: `${movie.progress}%` }}
                            />
                          </div>
                          <span className="text-white text-xs font-medium">{movie.progress}%</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Watching Scroll Navigation Buttons */}
              <button
                onClick={() => scrollContainer(continueWatchingScrollRef, "left", 320)}
                className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-16 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollContainer(continueWatchingScrollRef, "right", 320)}
                className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-16 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Top 10 Section */}
          <div className="space-y-6 pb-12">
            <h2 className="text-2xl font-bold text-white">Top 10</h2>
            <div className="relative group">
              <div
                ref={topMoviesScrollRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
                onWheel={(e) => handleWheel(e, topMoviesScrollRef)}
              >
                {topMovies.map((movie) => (
                  <div key={movie.rank} className="flex-shrink-0 group cursor-pointer">
                    <div className="relative w-40">
                      <div className="aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={movie.image || "/placeholder.svg"}
                          alt={movie.title}
                          width={160}
                          height={240}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-3 left-3 w-8 h-8 bg-[#feb625] rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-black font-bold text-lg">{movie.rank}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-white text-sm font-medium">{movie.title}</p>
                        <p className="text-gray-400 text-xs">{movie.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top 10 Scroll Navigation Buttons */}
              <button
                onClick={() => scrollContainer(topMoviesScrollRef, "left", 250)}
                className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-16 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollContainer(topMoviesScrollRef, "right", 250)}
                className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 backdrop-blur w-16 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hidden group-hover:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}




/* REVISAR ESSA PARTE PFVR */

/* "use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGenres } from "@/hooks/use-genre";
import { ContinueWatchingService } from "@/services/continueWatching.service";
import { TopMoviesService } from "@/services/topMovies.service";
import { Video } from "@prisma/client";

export default function DashboardPage({ profileId }: { profileId: number }) {
  const { genres, selectedGenre, setSelectedGenre, videos } = useGenres();
  const [continueWatching, setContinueWatching] = useState<Video[]>([]);
  const [topMovies, setTopMovies] = useState<Video[]>([]);

  const genreScrollRef = useRef<HTMLDivElement>(null);
  const movieScrollRef = useRef<HTMLDivElement>(null);
  const continueWatchingScrollRef = useRef<HTMLDivElement>(null);
  const topMoviesScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContinueWatching = async () => {
      const data = await new ContinueWatchingService().getContinueWatching(profileId);
      setContinueWatching(data);
    };
    const fetchTopMovies = async () => {
      const data = await new TopMoviesService().getTopMovies();
      setTopMovies(data);
    };

    fetchContinueWatching();
    fetchTopMovies();
  }, [profileId]);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right", amount = 200) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  const handleWheel = (e: React.WheelEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      e.preventDefault();
      ref.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Sidebar />
      <Header />

      <main className="ml-16 pt-16">
        <HeroCarousel />

        <div className="px-8 space-y-12">
          {/* Genre Filters *
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative group">
              <div
                ref={genreScrollRef}
                className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide pr-4"
                onWheel={(e) => handleWheel(e, genreScrollRef)}
              >
                {genres.map((genre) => (
                  <Button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-6 py-2 rounded-full whitespace-nowrap ${
                      selectedGenre?.id === genre.id
                        ? "bg-[#feb625] text-black hover:bg-[#feb625]/90"
                        : "bg-transparent border border-white text-white hover:bg-white/10"
                    }`}
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>
              <button onClick={() => scrollContainer(genreScrollRef, "left", 200)} className="absolute left-0 top-0 bottom-0 z-10 ..."><ChevronLeft /></button>
              <button onClick={() => scrollContainer(genreScrollRef, "right", 200)} className="absolute right-0 top-0 bottom-0 z-10 ..."><ChevronRight /></button>
            </div>
            <Button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full whitespace-nowrap">See more</Button>
          </div>

          {/* Movies by Genre *
          <div className="space-y-4">
            <div className="relative group">
              <div ref={movieScrollRef} className="flex space-x-4 overflow-x-auto pb-4" onWheel={(e) => handleWheel(e, movieScrollRef)}>
                {videos.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-shrink-0 space-y-3 group cursor-pointer">
                    <div className="w-40 h-60 bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                      <Image src={movie.image || "/placeholder.svg"} alt={movie.title} width={160} height={240} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white text-sm font-medium">{movie.title}</p>
                      <p className="text-gray-400 text-xs">{movie.year}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <button onClick={() => scrollContainer(movieScrollRef, "left", 250)} className="absolute left-0 top-0 bottom-0 z-10 ..."><ChevronLeft /></button>
              <button onClick={() => scrollContainer(movieScrollRef, "right", 250)} className="absolute right-0 top-0 bottom-0 z-10 ..."><ChevronRight /></button>
            </div>
          </div>

          {/* Continue Watching *
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Continue watching</h2>
            <div className="relative group">
              <div ref={continueWatchingScrollRef} className="flex space-x-6 overflow-x-auto pb-4" onWheel={(e) => handleWheel(e, continueWatchingScrollRef)}>
                {continueWatching.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-shrink-0 w-80 group cursor-pointer">
                    <div className="relative aspect-video bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                      <Image src={movie.image || "/placeholder.svg"} alt={movie.title} width={320} height={180} className="w-full h-full object-cover"/>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-medium mb-2">{movie.title}</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-600 rounded-full h-1">
                            <div className="bg-white rounded-full h-1" style={{ width: `${movie.progress}%` }}/>
                          </div>
                          <span className="text-white text-xs font-medium">{movie.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <button onClick={() => scrollContainer(continueWatchingScrollRef, "left", 320)} className="absolute left-0 top-0 bottom-0 z-10 ..."><ChevronLeft /></button>
              <button onClick={() => scrollContainer(continueWatchingScrollRef, "right", 320)} className="absolute right-0 top-0 bottom-0 z-10 ..."><ChevronRight /></button>
            </div>
          </div>

          {/* Top 10 *
          <div className="space-y-6 pb-12">
            <h2 className="text-2xl font-bold text-white">Top 10</h2>
            <div className="relative group">
              <div ref={topMoviesScrollRef} className="flex space-x-4 overflow-x-auto pb-4" onWheel={(e) => handleWheel(e, topMoviesScrollRef)}>
                {topMovies.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-shrink-0 group cursor-pointer">
                    <div className="relative w-40">
                      <div className="aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                        <Image src={movie.image || "/placeholder.svg"} alt={movie.title} width={160} height={240} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                      </div>
                      <div className="absolute top-3 left-3 w-8 h-8 bg-[#feb625] rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-black font-bold text-lg">{movie.rank}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-white text-sm font-medium">{movie.title}</p>
                        <p className="text-gray-400 text-xs">{movie.year}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <button onClick={() => scrollContainer(topMoviesScrollRef, "left", 250)} className="absolute left-0 top-0 bottom-0 z-10 ..."><ChevronLeft /></button>
              <button onClick={() => scrollContainer(topMoviesScrollRef, "right", 250)} className="absolute right-0 top-0 bottom-0 z-10 ..."><ChevronRight /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
 */