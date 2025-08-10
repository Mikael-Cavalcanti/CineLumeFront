"use client"

import { useState, useEffect } from 'react'
import { Profile } from '@/interfaces/profile'
import { ProfileService } from '@/services/profile/profile.service'

export const useProfiles = () => {
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const profileService = new ProfileService()

    useEffect(() => {
        fetchProfiles()
    }, [])

    const fetchProfiles = async () => {
        try {
            setLoading(true)
            setError(null)
            
            // Debug: check if token is found
            const token = typeof window !== 'undefined' ? 
                document.cookie.includes('access_token') : false
            console.log('Cookie access_token encontrado:', token)
            console.log('Cookies:', document.cookie)
            console.log('Buscando profiles...')
            
            const data = await profileService.getProfiles()
            console.log('Profiles recebidos:', data)
            setProfiles(data)
        } catch (err: any) {
            console.error('Erro ao buscar profiles:', err)
            console.error('Status da resposta:', err?.response?.status)
            console.error('Dados da resposta:', err?.response?.data)
            setError(err?.response?.data?.message || err?.message || 'Erro ao carregar profiles')
        } finally {
            setLoading(false)
        }
    }

    const selectProfile = (profileId: number) => {
        // Store selected profile in localStorage
        localStorage.setItem('selectedProfileId', profileId.toString())
        
        // Navigate to dashboard
        window.location.href = '/dashboard'
    }

    return {
        profiles,
        loading,
        error,
        selectProfile,
        refetchProfiles: fetchProfiles
    }
}