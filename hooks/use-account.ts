"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserService } from '@/services/user/user.service'

export const useAccount = () => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

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

    return {
        isDeleting,
        error,
        handleDeleteAccount
    }
}