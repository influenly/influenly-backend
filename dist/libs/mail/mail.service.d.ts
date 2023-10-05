import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly mailerService;
    private readonly configService;
    private signUpConfirmationBaseURL;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendUserConfirmation(user: any, actionToken: string): Promise<void>;
}
