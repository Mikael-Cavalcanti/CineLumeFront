// src/services/favorites/favorites.service.ts
import { CreateFavoriteDto, DeleteFavoriteDto, Favorite } from '../../interfaces/favorites';
import { FavoritesRepository } from './favorites.repository';

export class FavoritesService {
  private repository: FavoritesRepository;

  constructor() {
    this.repository = new FavoritesRepository();
  }

  async add(dto: CreateFavoriteDto): Promise<Favorite> {
    return this.repository.addFavorite(dto);
  }

  async remove(dto: DeleteFavoriteDto): Promise<void> {
    return this.repository.removeFavorite(dto);
  }

  async listByProfile(profileId: number): Promise<Favorite[]> {
    return this.repository.listFavoritesByProfile(profileId);
  }

  async checkIsFavorite(profileId: number, videoId: number): Promise<boolean> {
    return this.repository.isFavorite(profileId, videoId);
  }
}
