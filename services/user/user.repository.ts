import {UpdateUserDTO, User} from "@/interfaces/user";
import {api} from "@/lib/api";

export class UserRepository {
    async updateUser(dto: UpdateUserDTO): Promise<User> {
        const {data} = await api.patch('/user/update/me', dto);
        return data;
    }

    async getMe(): Promise<User> {
        const {data} = await api.get('/user/me');
        return data;
    }

    async deleteMe(): Promise<{ name: string }> {
        const {data} = await api.delete('/user/delete/me');
        return data;
    }
}