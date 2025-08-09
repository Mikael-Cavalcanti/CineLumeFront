"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Movie {
  id: number
  title: string
  subtitle: string
  image: string
}

const featuredMovies: Movie[] = [
  {
    id: 1,
    title: "Jurassic World: Fallen Kingdom",
    subtitle: "Experience the thrill",
    image: "/main-dashboard-bg.png",
  },
  {
    id: 2,
    title: "Avatar: The Way of Water",
    subtitle: "Return to Pandora",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    subtitle: "Feel the need for speed",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: 4,
    title: "Black Panther: Wakanda Forever",
    subtitle: "Honor the legacy",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: 5,
    title: "Spider-Man: No Way Home",
    subtitle: "The multiverse unleashed",
    image: "/placeholder.svg?height=600&width=1000",
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const cardWidth = 900
    const totalWidth = featuredMovies.length * cardWidth
    const containerWidth = window.innerWidth - 64 // Account for sidebar
    setDragConstraints({
      left: -(totalWidth - containerWidth),
      right: 0,
    })
  }, [])

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)
      }, 5000)
    }

    const stopAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    if (!isHovered) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }

    return () => stopAutoPlay()
  }, [isHovered])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold && currentIndex > 0) {
      prevSlide()
    } else if (info.offset.x < -threshold && currentIndex < featuredMovies.length - 1) {
      nextSlide()
    }
  }

  const getCardStyle = (index: number) => {
    const distance = index - currentIndex
    const absDistance = Math.abs(distance)

    return {
      scale: absDistance === 0 ? 1 : 1 - absDistance * 0.1,
      opacity: absDistance === 0 ? 1 : Math.max(0.3, 1 - absDistance * 0.3),
      zIndex: featuredMovies.length - absDistance,
      x: distance * 300,
      rotateY: distance * -15,
    }
  }

  return (
    <div
      className="relative h-[75vh] overflow-hidden bg-[#0D0D0D] mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto px-8">
          {/* Cards Container */}
          <div className="relative h-[800px] flex items-center justify-center perspective-1000">
            <AnimatePresence mode="wait">
              {featuredMovies.map((movie, index) => {
                const style = getCardStyle(index)
                const isActive = index === currentIndex

                return (
                  <motion.div
                    key={movie.id}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      ...style,
                      transition: {
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ cursor: "grabbing" }}
                    style={{
                      zIndex: isActive ? 20 : style.zIndex,
                      cursor: isActive ? "grab" : "pointer",
                    }}
                    onClick={() => !isActive && setCurrentIndex(index)}
                  >
                    <div
                      className={`relative w-[1200px] h-[500px] rounded-2xl overflow-hidden transition-all duration-500 ${isActive ? "shadow-2xl shadow-black/50" : "shadow-lg shadow-black/30"
                        }`}
                    >
                      {/* Movie Image */}
                      <Image
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent/40 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: isActive ? 1 : 0.7,
                            y: isActive ? 0 : 10,
                          }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-left gap-4">

                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                              >
                                <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-3 py-3 rounded-full shadow-lg 
                                border border-white/20 transition-all duration-300 hover:scale-105 flex items-center">
                                  <Play className="w-4 h-5" />
                                </Button>
                              </motion.div>
                            )}

                            <div>
                              <h4 className="text-2xl font-bold text-white leading-tight">{movie.title}</h4>
                              <p className="text-gray-200 text-lg">Play now</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Active Card Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 bg-[#feb625] rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="z-20 absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Background Blur Effect */}
      <div className="z-10 absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D0D0D]/40 pointer-events-none" />

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {featuredMovies.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#feb625] w-8" : "bg-white/50"
              }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
