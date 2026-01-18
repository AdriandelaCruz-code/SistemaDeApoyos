export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface EmailSender {
  send(to: string, subject: string, html: string, attachments?: EmailAttachment[]): Promise<void>;
}
