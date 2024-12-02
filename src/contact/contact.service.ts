import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/cantact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
@Injectable()
export class ContactService {
  constructor(
    private readonly contactService: MailerService,
    @InjectRepository(Contact)
    private readonly ContactRepo: Repository<Contact>,
  ) {}

  async saveContact(contactData: CreateContactDto) {
    const contact = this.ContactRepo.create(contactData);
    await this.ContactRepo.save(contact);
    await this.sendEmail(contactData);
    return {
      contact,
      statusCode: 201,
      message: {
        status: 'success',
        message: 'Contact form submitted successfully',
      },
    };
  }
  async sendEmail(contactData: any) {
    try {
      await this.contactService.sendMail({
        to: 'houssinmhamdi123@gmail.com',
        from: contactData.email,
        subject: 'Contact Form Submission',
        text: `Name: ${contactData.name}\nEmail: ${contactData.email}\nMessage: ${contactData.message}`,
      });
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Email sending failed');
    }
  }
}
