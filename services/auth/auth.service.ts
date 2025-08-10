import {AuthRepository} from "@/services/auth/auth.repository";
import {AuthBaseDTO, RegisterDTO} from "@/interfaces/auth";
import {setAuthToken} from "@/lib/api";

export class AuthService {
    private repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    async register(dto: RegisterDTO): Promise<{ message: string }> {
        return this.repository.register(dto);
    }

    async login(dto: AuthBaseDTO, remember: boolean = false): Promise<{ verified: boolean }> {
        const response = await this.repository.login(dto);
        
        // Save JWT token if provided
        if (response.token) {
            setAuthToken(response.token, remember);
        }
        
        return response;
    }
}
