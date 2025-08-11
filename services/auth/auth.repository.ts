import {AuthBaseDTO, RegisterDTO} from "@/interfaces/auth";
import {api} from "@/lib/api";

export class AuthRepository {
    async register(dto: RegisterDTO): Promise<{ message: string }> {
        return await api.post('/auth/register', dto);
    }

    async login(dto: AuthBaseDTO): Promise<{ verified: boolean }> {
        return await api.post('/auth/login', dto);
    }

    async logout(): Promise<void> {
        await api.post('/auth/logout');
    }
}