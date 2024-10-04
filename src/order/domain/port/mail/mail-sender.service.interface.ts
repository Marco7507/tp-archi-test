export interface MailSenderServiceInterface {
  sendMail(to: string, subject: string, body: string): Promise<void>;
}
