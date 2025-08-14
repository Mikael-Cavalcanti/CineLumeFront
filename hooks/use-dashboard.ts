"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export const useDashboard = () => {
    const searchParams = useSearchParams()
    const [profileId, setProfileId] = useState<number | null>(null)

    useEffect(() => {
        // Get profile ID from URL params
        const profileIdParam = searchParams?.get('profileId')
        
        if (profileIdParam) {
            setProfileId(parseInt(profileIdParam))
        } else {
            // Fallback to localStorage if not in URL
            const storedProfileId = localStorage.getItem('selectedProfileId')
            if (storedProfileId) {
                setProfileId(parseInt(storedProfileId))
            }
        }
    }, [searchParams])

    return {
        profileId
    }
}