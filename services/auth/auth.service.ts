import {RegisterDTO} from "@/interfaces/auth";
import {api} from "@/lib/api";

export const AuthService = {
    async register(payload: RegisterDTO) {
        const {data} = await api.post('/auth/register', payload)
        return data as { message: string }
    },
}
