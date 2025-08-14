import { api } from "@/lib/api";

export class VideosService {
  // Buscar vídeo pelo ID
  async findVideoById(id: number): Promise<any> {
    const response = await api.get<any>(`/videos/find/${id}`);
    return response.data;
  }

  // Buscar vídeo pelo título
  async findVideoByTitle(title: string): Promise<any> {
    const response = await api.get<any>(`/videos/find/${title}`);
    return response.data;
  }

  // Criar novo vídeo
  async createVideo(dto: any): Promise<any> {
    const response = await api.post<any>("/videos/new", dto);
    return response.data;
  }

  // Atualizar vídeo pelo ID
  async updateVideoById(id: number, dto: any): Promise<any> {
    const response = await api.patch<any>(`/videos/update/${id}`, dto);
    return response.data;
  }

  // Atualizar vídeo pelo título
  async updateVideoByTitle(dto: any): Promise<any> {
    const response = await api.patch<any>("/videos/update", dto);
    return response.data;
  }

  // Remover vídeo pelo ID
  async removeVideo(id: number): Promise<any> {
    const response = await api.delete<any>(`/videos/remove/${id}`);
    return response.data;
  }

  // Salvar progresso do vídeo
  async salvarProgress(profileId: number, videoId: number, tempoAssistido: number) {
    const response = await api.post("/videos/progress", { profileId, videoId, tempoAssistido });
    return response.data;
  }

  // Obter progresso do vídeo
  async getProgress(profileId: number, videoId: number) {
    const response = await api.get(`/videos/progress/${profileId}/${videoId}`);
    return response.data;
  }

  // Stream de vídeo (retorna URL ou Blob)
  async getVideoStreamUrl(id: string): Promise<string> {
    // Retornar a URL direta para o player de vídeo
    return `/videos/${id}/stream`;
  }
}
