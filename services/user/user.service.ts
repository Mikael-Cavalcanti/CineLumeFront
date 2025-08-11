import {UserRepository} from "@/services/user/user.repository";
import {UpdateUserDTO, User} from "@/interfaces/user";

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async updateUser(dto: UpdateUserDTO): Promise<User> {
        return this.repository.updateUser(dto);
    }

    async getMe(): Promise<User> {
        return this.repository.getMe();
    }

    async deleteMe(): Promise<{ name: string }> {
        return this.repository.deleteMe();
    }
}