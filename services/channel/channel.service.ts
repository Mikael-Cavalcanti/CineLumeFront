import { api } from "@/lib/api";

export class ChannelService {
  // Criar um novo canal
  async createChannel(dto: any): Promise<any> {
    const response = await api.post<any>("/channels", dto);
    return response.data;
  }

  // Listar todos os canais
  async getAllChannels(): Promise<any[]> {
    const response = await api.get<any[]>("/channels");
    return response.data;
  }

  // Obter canal pelo ID
  async getChannelById(id: number): Promise<any> {
    const response = await api.get<any>(`/channels/${id}`);
    return response.data;
  }

  // Atualizar canal pelo ID
  async updateChannel(id: number, dto: any): Promise<any> {
    const response = await api.patch<any>(`/channels/${id}`, dto);
    return response.data;
  }

  // Deletar canal pelo ID
  async deleteChannel(id: number): Promise<void> {
    await api.delete(`/channels/${id}`);
  }
}
