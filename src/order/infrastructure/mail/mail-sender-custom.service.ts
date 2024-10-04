import { MailSenderServiceInterface } from '../../domain/port/mail/mail-sender.service.interface';

export class MailSenderCustomService implements MailSenderServiceInterface {
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    console.log(
      `Sending mail to ${to} with subject ${subject} and body ${body}`,
    );
  }
}
