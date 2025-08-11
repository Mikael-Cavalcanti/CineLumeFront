import {MailRepository} from "@/services/mail/mail.repository";
import {MailDTO} from "@/interfaces/mail";

export class MailService {
    private mailRepository: MailRepository;

    constructor() {
        this.mailRepository = new MailRepository();
    }

    async verifyEmail(dto: MailDTO): Promise<{ message: string }> {
        return this.mailRepository.verifyEmail(dto);
    }

    async resendEmail(email: string): Promise<{ message: string }> {
        return this.mailRepository.resendEmail(email);
    }
}