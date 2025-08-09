"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {AuthService} from "@/services/auth/auth.service";

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
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthDate, setBirthDate] = useState('') // YYYY-MM-DD
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            // Validação mínima
            if (!name || !email || !password || !birthDate) {
                throw new Error('Preencha todos os campos.')
            }
            if (password.length < 6) {
                throw new Error('A senha deve ter no mínimo 6 caracteres.')
            }

            const [day, month, year] = birthDate.split('/')
            const isoBirthDate = `${year}-${month}-${day}`

            // Chama o backend
            await AuthService.register({name, email, password, birthDate: isoBirthDate})

            router.push(`/verify-email?email=${encodeURIComponent(email)}`)
        } catch (err: any) {
            setError(err?.message ?? 'Erro ao registrar. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

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
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white tracking-wider">
                            CINE<span className="text-[#feb625]">LUME</span>
                        </h1>
                    </div>

                    {/* Title */}
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white">Register</h2>
                    </div>

                    {/* Register form */}
                    <form
                        onSubmit={onSubmit}
                        className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[#c5c5c5] text-sm">
                                Your name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#c5c5c5] text-sm">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="birthdate" className="text-[#c5c5c5] text-sm">
                                Your birthdate
                            </Label>
                            <Input
                                id="birthdate"
                                type="text"
                                placeholder="DD/MM/YYYY"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[#c5c5c5] text-sm">
                                Your password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                            />
                        </div>

                        {/*<div className="space-y-2">*/}
                        {/*    <Label htmlFor="confirm-password" className="text-[#c5c5c5] text-sm">*/}
                        {/*        Repeat password*/}
                        {/*    </Label>*/}
                        {/*    <Input*/}
                        {/*        id="confirm-password"*/}
                        {/*        type="password"*/}
                        {/*        placeholder="Password"*/}
                        {/*        className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/* Terms and Conditions */}
                        {/*<div className="flex items-center space-x-3">*/}
                        {/*  <Checkbox*/}
                        {/*    id="terms"*/}
                        {/*    className="border-[#787878] data-[state=checked]:bg-[#feb625] data-[state=checked]:border-[#feb625]"*/}
                        {/*  />*/}
                        {/*  <Label htmlFor="terms" className="text-[#c5c5c5] text-sm">*/}
                        {/*    I agree with the{" "}*/}
                        {/*    <Link href="#" className="underline hover:text-white">*/}
                        {/*      terms and conditions*/}
                        {/*    </Link>*/}
                        {/*  </Label>*/}
                        {/*</div>*/}

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#feb625] hover:bg-[#feb625]/90 text-black font-semibold py-3 rounded-lg h-12 text-base flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

