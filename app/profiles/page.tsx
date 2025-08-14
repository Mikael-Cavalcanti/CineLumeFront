"use client"

import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Plus, Loader2, Edit2} from "lucide-react"
import Link from "next/link"
import {useProfiles} from "@/hooks/use-profiles"
import { useState } from "react"

export default function ProfilesPage() {
    const {profiles, loading, error, selectProfile} = useProfiles()
    const [isManaging, setIsManaging] = useState(false)

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#feb625] mx-auto"/>
                    <p className="text-white">Carregando profiles...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-red-500">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-[#feb625] text-black">
                        Tentar novamente
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center p-8">
            {/* Logo */}
            <div className="absolute top-8 left-8">
                <h1 className="text-2xl font-bold text-white tracking-wider">
                    CINE<span className="text-[#feb625]">LUME</span>
                </h1>
            </div>

            <div className="text-center space-y-12">
                {/* Title */}
                <h2 className="text-4xl font-bold text-white">Who's watching?</h2>

                {/* Profiles */}
                <div className="flex items-center justify-center space-x-8">
                    {profiles.map((profile) => (
                        <div
                            key={profile.id}
                            onClick={() => !isManaging && selectProfile(profile.id)}
                            className="flex flex-col items-center space-y-4 cursor-pointer group relative"
                        >
                            <div className="relative">
                                <Avatar className="w-32 h-32 group-hover:ring-4 group-hover:ring-[#feb625] transition-all">
                                    <AvatarImage src={profile.avatarUrl || "/profiles/profile_2.png"}/>
                                    <AvatarFallback
                                        className="text-2xl bg-[#1d1d1d] text-white">{profile.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {isManaging && (
                                    <Link href={`/edit-profile?id=${profile.id}`}>
                                        <button className="absolute -top-2 -right-2 w-10 h-10 bg-[#feb625] rounded-full flex items-center justify-center hover:bg-[#feb625]/90 transition-colors">
                                            <Edit2 className="w-5 h-5 text-black" />
                                        </button>
                                    </Link>
                                )}
                            </div>
                            <span className="text-white text-lg font-medium">{profile.name}</span>
                            {profile.isKidsProfile && (
                                <span className="text-[#feb625] text-xs">KIDS</span>
                            )}
                        </div>
                    ))}

                    {/* Add Profile */}
                    <Link href="/edit-profile">
                        <div className="flex flex-col items-center space-y-4 cursor-pointer group">
                            <div
                                className="w-32 h-32 rounded-full bg-[#1d1d1d] flex items-center justify-center group-hover:bg-[#feb625] transition-colors">
                                <Plus className="w-12 h-12 text-[#787878] group-hover:text-black"/>
                            </div>
                            <span className="text-[#787878] text-lg font-medium group-hover:text-white transition-colors">Add Profile</span>
                        </div>
                    </Link>
                </div>

                {/* Manage Profiles */}
                <Button
                    variant="outline"
                    onClick={() => setIsManaging(!isManaging)}
                    className="bg-transparent border-[#787878] text-[#787878] hover:bg-[#feb625]/10 hover:border-[#feb625] hover:text-[#feb625] px-8 py-3 transition-all"
                >
                    {isManaging ? 'DONE' : 'MANAGE PROFILES'}
                </Button>
            </div>

            {/* Logo bottom right */}
            <div className="absolute bottom-8 right-8">
                <div className="w-16 h-16 bg-[#feb625] rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">C</span>
                </div>
            </div>
        </div>
    )
}
