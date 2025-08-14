import { api } from "@/lib/api";

// Interface para os dados do vídeo retornados pelo backend
export interface Video {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  duration: number;
  type: string;
  thumbnailUrl: string;
  videoUrl: string;
  ageRating: string;
  createdAt: string;
}

// Interface para entrada do histórico (quando necessário)
export interface HistoryEntry {
  id: number;
  profileId: number;
  videoId: number;
  watchedAt: Date;
  completed: boolean;
  progress?: number;
  video?: Video;
}

// Interface para compatibilidade com os dados reais do backend
export interface HistoryResponse extends Video {
  // Os dados já vêm com a estrutura do Video diretamente
}

export class HistoryRepository {
  // Get completed video history - retorna diretamente os vídeos
  async getCompletedHistory(profileId: number): Promise<Video[]> {
    const response = await api.get<Video[]>(`/history/completed/${profileId}`);
    return response.data;
  }

  // Get watching video history - retorna diretamente os vídeos
  async getWatchingHistory(profileId: number): Promise<Video[]> {
    const response = await api.get<Video[]>(`/history/watching/${profileId}`);
    return response.data;
  }

  // Get all history for a profile - retorna diretamente os vídeos
  async getAllHistory(profileId: number): Promise<Video[]> {
    const response = await api.get<Video[]>(`/history/${profileId}`);
    return response.data;
  }

  // Add entry to history
  async addToHistory(profileId: number, videoId: number, progress?: number): Promise<HistoryEntry> {
    const response = await api.post<HistoryEntry>(`/history`, {
      profileId,
      videoId,
      progress,
      completed: progress === 100
    });
    return response.data;
  }

  // Mark video as completed
  async markAsCompleted(profileId: number, videoId: number): Promise<HistoryEntry> {
    const response = await api.put<HistoryEntry>(`/history/complete`, {
      profileId,
      videoId,
      completed: true,
      progress: 100
    });
    return response.data;
  }

  // Update video progress
  async updateProgress(profileId: number, videoId: number, progress: number): Promise<HistoryEntry> {
    const response = await api.put<HistoryEntry>(`/history/progress`, {
      profileId,
      videoId,
      progress,
      completed: progress >= 100
    });
    return response.data;
  }

  // Remove entry from history
  async removeFromHistory(profileId: number, videoId: number): Promise<void> {
    await api.delete(`/history/${profileId}/${videoId}`);
  }
}