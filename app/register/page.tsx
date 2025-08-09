"use client"

import Image from "next/image"
import { RegisterForm } from "@/components/register-form"

// Movie posters for the infinite scroll
const moviePosters = [
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
]

export default function RegisterPage() {

    return (
        <div className="min-h-screen flex">
            {/* Left side - Infinite scrolling movie posters */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0c0c0c]">
                {/* First set of posters */}
                <div className="absolute inset-0 flex flex-col animate-scroll-up">
                    <div className="grid grid-cols-3 gap-2 p-4">
                        {moviePosters.map((poster, index) => (
                            <div key={`first-${index}`}
                                 className="aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden">
                                <Image
                                    src={poster || "/placeholder.svg"}
                                    alt={`Movie poster ${index + 1}`}
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 p-4">
                        {moviePosters.map((poster, index) => (
                            <div key={`second-${index}`}
                                 className="aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden">
                                <Image
                                    src={poster || "/placeholder.svg"}
                                    alt={`Movie poster ${index + 1}`}
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second set of posters for seamless loop */}
                <div className="absolute inset-0 flex flex-col animate-scroll-up-delayed">
                    <div className="grid grid-cols-3 gap-2 p-4">
                        {moviePosters.map((poster, index) => (
                            <div key={`third-${index}`}
                                 className="aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden">
                                <Image
                                    src={poster || "/placeholder.svg"}
                                    alt={`Movie poster ${index + 1}`}
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 p-4">
                        {moviePosters.map((poster, index) => (
                            <div key={`fourth-${index}`}
                                 className="aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden">
                                <Image
                                    src={poster || "/placeholder.svg"}
                                    alt={`Movie poster ${index + 1}`}
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gradient overlays for smooth fade effect */}
                <div
                    className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0c0c0c] to-transparent z-10"/>
                <div
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0c0c] to-transparent z-10"/>

                {/* Overall dark overlay for better form readability */}
                <div className="absolute inset-0 bg-black/40 z-20"/>
            </div>

            {/* Right side - Register form */}
            <div className="w-full lg:w-1/2 bg-[#0c0c0c] flex items-center justify-center p-8">
                <RegisterForm />
            </div>
        </div>
    )
}

