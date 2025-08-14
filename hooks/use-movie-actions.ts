"use client"

import { useState, useCallback } from 'react'
import { FavoritesService } from '@/services/favorites/favorites.service'
import { HistoryService } from '@/services/history/history.service'

export const useMovieActions = (profileId: number) => {
    const [isAddingToFavorites, setIsAddingToFavorites] = useState(false)
    const [isAddingToHistory, setIsAddingToHistory] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    
    const favoritesService = new FavoritesService()
    const historyService = new HistoryService()

    const checkIsFavorite = useCallback(async (videoId: number) => {
        try {
            const favorites = await favoritesService.listByProfile(profileId)
            const favorite = favorites.find(fav => fav.videoId === videoId)
            setIsFavorite(!!favorite)
        } catch (error) {
            console.error('Erro ao verificar favorito:', error)
        }
    }, [profileId])

    const toggleFavorite = useCallback(async (videoId: number) => {
        setIsAddingToFavorites(true)
        try {
            if (isFavorite) {
                // Remover dos favoritos
                await favoritesService.remove({ profileId, videoId })
                setIsFavorite(false)
            } else {
                // Adicionar aos favoritos
                await favoritesService.add({ profileId, videoId })
                setIsFavorite(true)
            }
        } catch (error) {
            console.error('Erro ao alterar favorito:', error)
        } finally {
            setIsAddingToFavorites(false)
        }
    }, [profileId, isFavorite])

    const addToHistory = useCallback(async (videoId: number, progress?: number) => {
        setIsAddingToHistory(true)
        try {
            await historyService.addToHistory(profileId, videoId, progress)
        } catch (error) {
            console.error('Erro ao adicionar ao histórico:', error)
        } finally {
            setIsAddingToHistory(false)
        }
    }, [profileId])

    const updateProgress = useCallback(async (videoId: number, progress: number) => {
        try {
            await historyService.updateProgress(profileId, videoId, progress)
        } catch (error) {
            console.error('Erro ao atualizar progresso:', error)
        }
    }, [profileId])

    const markAsCompleted = useCallback(async (videoId: number) => {
        try {
            await historyService.markAsCompleted(profileId, videoId)
        } catch (error) {
            console.error('Erro ao marcar como concluído:', error)
        }
    }, [profileId])

    return {
        isFavorite,
        isAddingToFavorites,
        isAddingToHistory,
        checkIsFavorite,
        toggleFavorite,
        addToHistory,
        updateProgress,
        markAsCompleted
    }
}