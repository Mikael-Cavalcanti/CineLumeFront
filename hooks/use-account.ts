"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserService } from '@/services/user/user.service'
import { ProfileService } from '@/services/profile/profile.service'
import { User } from '@/interfaces/user'
import { Profile } from '@/interfaces/profile'

export const useAccount = () => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    const userService = new UserService()
    const profileService = new ProfileService()

    useEffect(() => {
        fetchUserAndProfile()
    }, [])

    const fetchUserAndProfile = async () => {
        try {
            setLoading(true)
            setError(null)

            // Get user info
            const userData = await userService.getMe()
            setUser(userData)

            // Get selected profile from localStorage
            const selectedProfileId = localStorage.getItem('selectedProfileId')
            if (selectedProfileId) {
                try {
                    const profileData = await profileService.getProfile(parseInt(selectedProfileId))
                    setSelectedProfile(profileData)
                } catch (profileErr) {
                    console.error('Error fetching selected profile:', profileErr)
                }
            }
        } catch (err: any) {
            console.error('Error fetching user data:', err)
            setError(err?.response?.data?.message || err?.message || 'Error loading account data')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return
        }

        setError(null)
        setIsDeleting(true)
        
        try {
            const userService = new UserService()
            await userService.deleteMe()
            
            router.push('/login')
        } catch (err: any) {
            console.error('Error deleting account:', err)
            setError(err?.response?.data?.message || err?.message || 'Failed to delete account. Please try again.')
            setIsDeleting(false)
        }
    }

    const handleManageProfiles = () => {
        router.push('/profiles')
    }

    return {
        user,
        selectedProfile,
        loading,
        isDeleting,
        error,
        handleDeleteAccount,
        handleManageProfiles
    }
}