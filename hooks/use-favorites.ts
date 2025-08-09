// src/hooks/useFavorites.ts
import {useState, useCallback} from 'react';
import {FavoritesService} from '../services/favorites/favorites.service';
import {BaseFavoriteDto, Favorite} from '@/interfaces/favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(false);

    const service = new FavoritesService();

    const loadFavorites = useCallback(async (profileId: number) => {
        setLoading(true);
        try {
            const data = await service.listByProfile(profileId);
            setFavorites(data);
        } finally {
            setLoading(false);
        }
    }, []);

    const addFavorite = useCallback(async (dto: BaseFavoriteDto) => {
        await service.add(dto);
        await loadFavorites(dto.profileId);
    }, [loadFavorites]);

    const removeFavorite = useCallback(async (dto: BaseFavoriteDto) => {
        await service.remove(dto);
        await loadFavorites(dto.profileId);
    }, [loadFavorites]);

    const isFavorite = useCallback(async (profileId: number, videoId: number) => {
        return service.checkIsFavorite(profileId, videoId);
    }, []);

    return {
        favorites,
        loading,
        loadFavorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
}
