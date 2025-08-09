// services/genre.service.ts
import { genreRepository } from "./genre.repository";
import {
  Genre,
  Video,
} from "../../interfaces/genre";

export const genreService = {
  getAllGenres: async (): Promise<Genre[]> => {
    const res = await genreRepository.getAll();
    if (!res.success) throw new Error(res.message || "Error fetching genres");
    return res.data!;
  },

  getVideosByGenre: async (
    genreId: number
  ): Promise<{ genre: string; videos: Video[] }> => {
    const res = await genreRepository.getVideosByGenre(genreId);
    if (!res.success) throw new Error(res.message || "Error fetching videos");
    return res.data!;
  }
};
