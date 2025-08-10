"use client"

import { useState } from "react"
import { ArrowLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

const featuredContent = [
  {
    id: 1,
    title: "Jurassic World: Fallen Kingdom",
    logo: "/placeholder.svg?height=100&width=200",
    background: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 2,
    title: "Stranger Things",
    logo: "/placeholder.svg?height=100&width=200",
    background: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 3,
    title: "The Crown",
    logo: "/placeholder.svg?height=100&width=200",
    background: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 4,
    title: "Ozark",
    logo: "/placeholder.svg?height=100&width=200",
    background: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 5,
    title: "The Witcher",
    logo: "/placeholder.svg?height=100&width=200",
    background: "/placeholder.svg?height=600&width=1200",
  },
]

const filmsAndSeries = [
  { id: 1, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 7, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 8, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 9, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 10, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 11, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { id: 12, title: "Film title", image: "/placeholder.svg?height=200&width=300" },
]

export default function NetflixChannelPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={featuredContent[currentSlide].background || "/placeholder.svg"}
          alt={featuredContent[currentSlide].title}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10">
          <div className="flex items-center space-x-4">
            <Link href="/channels">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Netflix</h1>
          </div>

          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
            <AvatarFallback className="bg-[#1d1d1d] text-white">U</AvatarFallback>
          </Avatar>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-20 left-6 z-10 space-y-6">
          {/* Movie Logo */}
          <div className="w-80 h-32 relative">
            <Image
              src="/placeholder.svg?height=128&width=320"
              alt="Jurassic World Logo"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* Watch Now Button */}
          <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 py-3 rounded-lg shadow-lg border border-white/20 transition-all duration-300">
            <Play className="w-5 h-5 mr-2" />
            Watch now
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Films and Series Section */}
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Films and series</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filmsAndSeries.map((item) => (
            <Link key={item.id} href={`/movie/${item.id}`} className="group cursor-pointer">
              <div className="space-y-3">
                <div className="aspect-video bg-[#2a2a2a] rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-white font-medium">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#1d1d1d]">
        <div className="flex items-center justify-between mb-8">
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

        <div className="text-center">
          <p className="text-[#787878] text-sm">© 2023 CineLume. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}
