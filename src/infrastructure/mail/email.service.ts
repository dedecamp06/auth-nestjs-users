import { BadGatewayException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(params: sendMail.params) {
    try {
      const { to, context, subject } = params;
      const sendMail = await this.mailerService.sendMail({
        to,
        subject,
        text: context,
      });
      return sendMail;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}

export namespace sendMail {
  export type params = {
    to: string;
    context: string;
    subject: string;
  };
}
