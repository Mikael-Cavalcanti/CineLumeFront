import { api } from "@/lib/api";

export class RecentlyWatchedService {
  // Registrar início de reprodução de vídeo
  async createPlayback(dto: any) {
    const response = await api.post("/recently-watched", dto);
    return response.data;
  }

  // Finalizar sessão de reprodução
  async finishPlayback(id: number, dto: any) {
    const response = await api.patch(`/recently-watched/${id}/finish`, dto);
    return response.data;
  }

  // Buscar últimos 10 vídeos assistidos pelo perfil
  async getRecentlyWatched(profileId: number) {
    const response = await api.get(`/recently-watched/list/${profileId}`);
    return response.data;
  }

  // Remover um vídeo da lista de assistidos recentemente
  async deleteRecentlyWatched(profileId: number, videoId: number) {
    const response = await api.delete(`/recently-watched/${videoId}`, {
      params: { profileId },
    });
    return response.data;
  }
}
