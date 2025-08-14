"use client"

import {useState, useEffect, useCallback} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {ProfileService} from '@/services/profile/profile.service'
import {Profile, UpdateProfileDto, CreateProfileDto} from '@/interfaces/profile'
import {UserService} from '@/services/user/user.service'

export const useEditProfile = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const profileService = new ProfileService()
    const userService = new UserService()

    const profileId = searchParams?.get('id')

    const [profile, setProfile] = useState<Profile | null>(null)
    const [name, setName] = useState<string>('')
    const [isKidProfile, setIsKidProfile] = useState<boolean>(false)
    const [avatarUrl, setAvatarUrl] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [fetchingProfile, setFetchingProfile] = useState(true)
    const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false)

    const availableAvatars = [
        '/profiles/profile_1.png',
        '/profiles/profile_2.png',
        '/profiles/Profile_3.png',
        '/profiles/profile_4.png',
        '/profiles/profile_5.png'
    ]

    // Fetch profile data if editing existing profile, set default avatar for new profile
    useEffect(() => {
        if (profileId) {
            fetchProfile()
        } else {
            setAvatarUrl('/profiles/profile_2.png')
            setFetchingProfile(false)
        }
    }, [profileId])

    const fetchProfile = async () => {
        if (!profileId) return

        try {
            setFetchingProfile(true)
            setError(null)
            const data = await profileService.getProfile(parseInt(profileId))
            setProfile(data)
            setName(data.name)
            setIsKidProfile(data.isKidsProfile)
            setAvatarUrl(data.avatarUrl || '')
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message || 'Erro ao carregar profile')
        } finally {
            setFetchingProfile(false)
        }
    }

    const handleSave = useCallback(async () => {
        if (!name.trim()) {
            setError('Nome é obrigatório')
            return
        }

        setLoading(true)
        setError(null)

        try {
            if (profileId) {
                // Update existing profile
                const updateData: UpdateProfileDto = {
                    id: parseInt(profileId),
                    name: name.trim(),
                    isKidProfile,
                    avatarUrl: avatarUrl || undefined
                }
                await profileService.updateProfile(updateData)
            } else {
                // Create new profile - get user info first
                const user = await userService.getMe()
                const createData: CreateProfileDto = {
                    userId: user.id,
                    name: name.trim(),
                    isKidProfile,
                    ...(avatarUrl && { avatarUrl })
                }
                await profileService.createProfile(createData)
            }
            
            setSuccess(true)
            router.push('/profiles')
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message || 'Erro ao salvar profile')
            setLoading(false)
        }
    }, [name, isKidProfile, avatarUrl, profileId, router])

    const handleDelete = useCallback(async () => {
        if (!profileId) {
            setError('ID do profile não encontrado')
            return
        }

        if (!confirm('Tem certeza que deseja excluir este profile? Esta ação não pode ser desfeita.')) {
            return
        }

        setLoading(true)
        setError(null)

        try {
            await profileService.deleteProfile(parseInt(profileId))
            setSuccess(true)
            router.push('/profiles')
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message || 'Erro ao excluir profile')
            setLoading(false)
        }
    }, [profileId, router])

    const handleCancel = () => {
        router.push('/profiles')
    }

    const openAvatarPopup = () => {
        setIsAvatarPopupOpen(true)
    }

    const closeAvatarPopup = () => {
        setIsAvatarPopupOpen(false)
    }

    const selectAvatar = (avatarPath: string) => {
        setAvatarUrl(avatarPath)
        setIsAvatarPopupOpen(false)
    }

    return {
        profile,
        name,
        setName,
        isKidProfile,
        setIsKidProfile,
        avatarUrl,
        setAvatarUrl,
        loading,
        error,
        success,
        fetchingProfile,
        handleSave,
        handleDelete,
        handleCancel,
        isEditing: !!profileId,
        isAvatarPopupOpen,
        availableAvatars,
        openAvatarPopup,
        closeAvatarPopup,
        selectAvatar
    }
}