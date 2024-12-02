import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { BookingModule } from './booking/booking.module';
import config from '../ormconfig';
import { ContactModule } from './contact/contact.module';
@Module({
  imports: [ProductModule, TypeOrmModule.forRoot(config), UserModule, CarModule, BookingModule,ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
