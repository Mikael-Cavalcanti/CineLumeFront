import {api} from '../../lib/api';
import {BaseFavoriteDto, Favorite} from '../../interfaces/favorites';

export class FavoritesRepository {
    async addFavorite(dto: BaseFavoriteDto): Promise<Favorite> {
        const {data} = await api.post('/favorites', dto);
        return data;
    }

    async removeFavorite(dto: BaseFavoriteDto): Promise<void> {
        await api.delete('/favorites', {data: dto});
    }

    async listFavoritesByProfile(profileId: number): Promise<Favorite[]> {
        const {data} = await api.get(`/favorites/${profileId}`);
        return data;
    }

    async isFavorite(profileId: number, videoId: number): Promise<boolean> {
        const {data} = await api.get(`/favorites/${profileId}/${videoId}`);
        return data.isFavorite;
    }
}
