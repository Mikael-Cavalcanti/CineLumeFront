import { api } from "@/lib/api";

export class HistoryService {
  // Obter histórico de vídeos concluídos
  async getCompletedHistory(profileID: number): Promise<any[]> {
    const response = await api.get<any[]>(`/history/completed/${profileID}`);
    return response.data;
  }

  // Obter histórico de vídeos em andamento
  async getWatchingHistory(profileID: number): Promise<any[]> {
    const response = await api.get<any[]>(`/history/watching/${profileID}`);
    return response.data;
  }
}
