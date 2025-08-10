import {UserRepository} from "@/services/user/user.repository";

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async updateUserAvatar(avatarUrl: string): Promise<void> {
        return this.repository.updateUserAvatar(avatarUrl);
    }

    getRandomAvatar(): string {
        const avatars = [
            '/profiles/profile_1.png',
            '/profiles/profile_2.png', 
            '/profiles/profile_3.png'
        ];
        
        const randomIndex = Math.floor(Math.random() * avatars.length);
        return avatars[randomIndex];
    }
}