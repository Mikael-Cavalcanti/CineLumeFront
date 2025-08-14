import { api } from "@/lib/api";

export class SubscribeService {
  // Obter todas as inscrições de um perfil
  async getAllSubscribes(profileId: number) {
    const response = await api.get(`/subscribes/${profileId}`);
    return response.data;
  }

  // Criar nova inscrição
  async createSubscribe(dto: any) {
    const response = await api.post(`/subscribes`, dto);
    return response.data;
  }

  // Remover inscrição
  async removeSubscribe(profileId: number, channelId: number) {
    const response = await api.delete(`/subscribes/${channelId}`, {
      params: { profileId },
    });
    return response.data;
  }
}
