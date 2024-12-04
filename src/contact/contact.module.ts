import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/cantact.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'houssin.carnelian@gmail.com',
          pass: 'lnmukaephetntfht',
        },
      },
      defaults: {
        from: '"Support Team" houssin.carnelian@gmail.com',
      },
    }),
  ],

  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
