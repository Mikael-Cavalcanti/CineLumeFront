import {MailDTO} from "@/interfaces/mail";
import {api} from "@/lib/api";

export class MailRepository {
    async verifyEmail(dto: MailDTO): Promise<void> {
        await api.post('/mail/verify-email', dto);
    }

    async resendEmail(email: string): Promise<void> {
        await api.post('/mail/resend-email', { email });
    }
}