// repositories/genre.repository.ts
import { api } from "@/lib/api";
import {
  ApiResponse,
  Genre,
  Video,
} from "../../interfaces/genre";

export const genreRepository = {
  getAll: async () => {
    const { data } = await api.get<ApiResponse<Genre[]>>("/genres");
    return data;
  },

  getVideosByGenre: async (genreId: number) => {
    const { data } = await api.get<ApiResponse<{ genre: string; videos: Video[] }>>(
      `/genres/${genreId}/videos`
    );
    return data;
  },
};
