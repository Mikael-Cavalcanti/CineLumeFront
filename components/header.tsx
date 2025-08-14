"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search, Bell, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfileService } from "@/services/profile/profile.service"
import { Profile } from "@/interfaces/profile"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const profileService = new ProfileService()

  useEffect(() => {
    const fetchSelectedProfile = async () => {
      try {
        const selectedProfileId = localStorage.getItem('selectedProfileId')
        if (selectedProfileId) {
          const profileData = await profileService.getProfile(parseInt(selectedProfileId))
          setSelectedProfile(profileData)
        }
      } catch (error) {
        console.error('Error fetching selected profile:', error)
      }
    }

    fetchSelectedProfile()
  }, [])

  const handleAvatarClick = () => {
    if (pathname === '/account') {
      // If already on account page, go back to previous page
      router.back()
    } else {
      // Navigate to account page
      router.push('/account')
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Navigate to search page as user types
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
    }
  }

  return (
    <header className="fixed top-0 left-16 right-0 h-16 bg-[#0c0c0c]/95 backdrop-blur-sm flex items-center justify-end px-6 z-40">
      {/* Right-aligned profile section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          {!isSearchOpen ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-[#787878] hover:text-white hover:bg-[#1d1d1d] transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </Button>
          ) : (
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search movies, shows..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onBlur={() => {
                    if (!searchQuery.trim()) {
                      setIsSearchOpen(false)
                    }
                  }}
                  autoFocus
                  className="w-64 bg-[#1d1d1d] border-[#333] text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 pl-10 pr-4 py-2 rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#787878]" />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }}
                className="ml-2 text-[#787878] hover:text-white hover:bg-[#1d1d1d] transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#787878] hover:text-white hover:bg-[#1d1d1d] transition-colors duration-200 relative"
        >
          <Bell className="w-5 h-5" />
          {/* Notification dot */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
        </Button>

        {/* User Avatar */}
        <Avatar 
          onClick={handleAvatarClick}
          className={`w-8 h-8 cursor-pointer ring-2 transition-all duration-200 ${
            pathname === '/account' 
              ? 'ring-[#feb625]' 
              : 'ring-transparent hover:ring-[#feb625]'
          }`}
        >
          <AvatarImage 
            src={selectedProfile?.avatarUrl || "/profiles/profile_2.png"} 
            alt="Profile avatar" 
          />
          <AvatarFallback className="bg-[#1d1d1d] text-white text-sm">
            {selectedProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
