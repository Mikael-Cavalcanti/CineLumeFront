import {MailDTO} from "@/interfaces/mail";
import {api} from "@/lib/api";

export class MailRepository {
    async verifyEmail(dto: MailDTO): Promise<{ message: string }> {
        const {data} = await api.post('/mail/verify-email', dto);
        return data;
    }

    async resendEmail(email: string): Promise<{ message: string }> {
        const {data} = await api.post(`/mail/resend-email/${email}`);
        return data;
    }
}