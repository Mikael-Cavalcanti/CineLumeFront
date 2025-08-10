import {MailRepository} from "@/services/mail/mail.repository";
import {UserService} from "@/services/user/user.service";

export class MailService {
    private mailRepository: MailRepository;
    private userService: UserService;

    constructor() {
        this.mailRepository = new MailRepository();
        this.userService = new UserService();
    }

    async verifyEmail(dto: { email: string; code: string }): Promise<void> {
        await this.mailRepository.verifyEmail(dto);
        
        // Update user with random avatar after successful verification
        const randomAvatar = this.userService.getRandomAvatar();
        try {
            await this.userService.updateUserAvatar(randomAvatar);
        } catch (error) {
            console.warn('Failed to update user avatar:', error);
        }
    }

    async resendEmail(email: string): Promise<void> {
        return this.mailRepository.resendEmail(email);
    }
}