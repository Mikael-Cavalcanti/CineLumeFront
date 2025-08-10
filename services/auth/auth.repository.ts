import {AuthBaseDTO, RegisterDTO} from "@/interfaces/auth";
import {api} from "@/lib/api";

export class AuthRepository {
    async register(dto: RegisterDTO): Promise<{ message: string }> {
        const {data} = await api.post('/auth/register', dto);
        return data;
    }

    async login(dto: AuthBaseDTO): Promise<{ verified: boolean, token?: string }> {
        const {data} = await api.post('/auth/login', dto);
        return data;
    }
}