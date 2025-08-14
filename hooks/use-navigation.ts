"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useNavigation = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const navigateWithProfile = useCallback((href: string) => {
        // Get current profileId from URL params or localStorage
        let profileId = searchParams?.get('profileId')
        
        if (!profileId) {
            // Fallback to localStorage if not in URL
            profileId = localStorage.getItem('selectedProfileId')
        }

        // If we have a profileId, append it to the URL
        if (profileId) {
            const url = new URL(href, window.location.origin)
            url.searchParams.set('profileId', profileId)
            router.push(url.pathname + url.search)
        } else {
            // Navigate normally if no profileId
            router.push(href)
        }
    }, [router, searchParams])

    const getCurrentProfileId = useCallback(() => {
        // Get profileId from URL params first, then fallback to localStorage
        const profileIdParam = searchParams?.get('profileId')
        if (profileIdParam) {
            return parseInt(profileIdParam)
        }
        
        const storedProfileId = localStorage.getItem('selectedProfileId')
        return storedProfileId ? parseInt(storedProfileId) : null
    }, [searchParams])

    return {
        navigateWithProfile,
        getCurrentProfileId,
    }
}