import { FavoritesRepository } from './favorites.repository';
import {BaseFavoriteDto, Favorite} from "@/interfaces/favorites";

export class FavoritesService {
  private repository: FavoritesRepository;

  constructor() {
    this.repository = new FavoritesRepository();
  }

  async add(dto: BaseFavoriteDto): Promise<Favorite> {
    return this.repository.addFavorite(dto);
  }

  async remove(dto: BaseFavoriteDto): Promise<void> {
    return this.repository.removeFavorite(dto);
  }

  async listByProfile(profileId: number): Promise<Favorite[]> {
    return this.repository.listFavoritesByProfile(profileId);
  }

  async checkIsFavorite(profileId: number, videoId: number): Promise<boolean> {
    return this.repository.isFavorite(profileId, videoId);
  }
}
