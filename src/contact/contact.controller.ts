
import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './entities/cantact.entity';
import { ValidationPipe } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submitContactForm(
    @Body(new ValidationPipe()) contactData: CreateContactDto,
  ) {
    return this.contactService.saveContact(contactData);
  }
}
