import {MailRepository} from "@/services/mail/mail.repository";

export class MailService {
    private mailRepository: MailRepository;

    constructor() {
        this.mailRepository = new MailRepository();
    }

    async verifyEmail(dto: { email: string; code: string }): Promise<void> {
        await this.mailRepository.verifyEmail(dto);
    }

    async resendEmail(email: string): Promise<void> {
        return this.mailRepository.resendEmail(email);
    }
}