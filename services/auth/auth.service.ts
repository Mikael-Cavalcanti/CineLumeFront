import {AuthRepository} from "@/services/auth/auth.repository";
import {AuthBaseDTO, RegisterDTO} from "@/interfaces/auth";

export class AuthService {
    private repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    async register(dto: RegisterDTO): Promise<{ message: string }> {
        return this.repository.register(dto);
    }

    async login(dto: AuthBaseDTO): Promise<{ verified: boolean }> {
        return this.repository.login(dto);
    }
}
