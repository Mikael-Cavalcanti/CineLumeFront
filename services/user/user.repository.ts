import {api} from "@/lib/api";

export class UserRepository {
    async updateUserAvatar(avatarUrl: string): Promise<void> {
        await api.put('/users/avatar', { avatarUrl });
    }
}