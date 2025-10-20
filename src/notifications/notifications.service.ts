import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendNewCompanyNotification(company: {
    name: string;
    email?: string;
    website?: string;
  }) {
    const adminEmail = this.configService.get<string>(
      'ADMIN_EMAIL',
      'admin@admin.com',
    );

    await this.mailerService.sendMail({
      to: adminEmail,
      subject: 'New Company Created',
      template: 'new-company',
      context: {
        name: company.name,
        email: company.email || '-',
        website: company.website || '-',
      },
    });
  }
}
