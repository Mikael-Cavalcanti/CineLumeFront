import { HistoryRepository, type HistoryEntry, type Video } from './history.repository';

export class HistoryService {
  private historyRepository: HistoryRepository;

  constructor() {
    this.historyRepository = new HistoryRepository();
  }

  // Obter histórico de vídeos concluídos
  async getCompletedHistory(profileId: number): Promise<Video[]> {
    try {
      return await this.historyRepository.getCompletedHistory(profileId);
    } catch (error) {
      console.error('Erro ao buscar histórico concluído:', error);
      return [];
    }
  }

  // Obter histórico de vídeos em andamento
  async getWatchingHistory(profileId: number): Promise<Video[]> {
    try {
      return await this.historyRepository.getWatchingHistory(profileId);
    } catch (error) {
      console.error('Erro ao buscar histórico em andamento:', error);
      return [];
    }
  }

  // Obter todo o histórico de um perfil
  async getAllHistory(profileId: number): Promise<Video[]> {
    try {
      return await this.historyRepository.getAllHistory(profileId);
    } catch (error) {
      console.error('Erro ao buscar histórico completo:', error);
      return [];
    }
  }

  // Adicionar entrada no histórico
  async addToHistory(profileId: number, videoId: number, progress?: number): Promise<HistoryEntry | null> {
    try {
      return await this.historyRepository.addToHistory(profileId, videoId, progress);
    } catch (error) {
      console.error('Erro ao adicionar ao histórico:', error);
      return null;
    }
  }

  // Marcar vídeo como concluído
  async markAsCompleted(profileId: number, videoId: number): Promise<HistoryEntry | null> {
    try {
      return await this.historyRepository.markAsCompleted(profileId, videoId);
    } catch (error) {
      console.error('Erro ao marcar como concluído:', error);
      return null;
    }
  }

  // Atualizar progresso de um vídeo
  async updateProgress(profileId: number, videoId: number, progress: number): Promise<HistoryEntry | null> {
    try {
      return await this.historyRepository.updateProgress(profileId, videoId, progress);
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      return null;
    }
  }

  // Remover entrada do histórico
  async removeFromHistory(profileId: number, videoId: number): Promise<boolean> {
    try {
      await this.historyRepository.removeFromHistory(profileId, videoId);
      return true;
    } catch (error) {
      console.error('Erro ao remover do histórico:', error);
      return false;
    }
  }
}
