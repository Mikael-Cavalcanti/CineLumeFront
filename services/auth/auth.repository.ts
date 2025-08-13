import {AuthBaseDTO, RegisterDTO} from "@/interfaces/auth";
import {api} from "@/lib/api";

export class AuthRepository {
    async register(dto: RegisterDTO): Promise<{ message: string }> {
        const response = await api.post('/auth/register', dto);
        return response.data;
    }

    async login(dto: AuthBaseDTO): Promise<{ verified: boolean }> {
        const response = await api.post('/auth/login', dto);
        return response.data;
    }

    async logout(): Promise<void> {
        await api.post('/auth/logout');
    }
}