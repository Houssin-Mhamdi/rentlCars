import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { BookingModule } from './booking/booking.module';
import { ContactModule } from './contact/contact.module';
@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-ct72tplds78s73bc6je0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'car_rent_jizy_user',
      password: 'ewW8CXozwK7g38jkY05V4NcWQgA0ha3d',
      database: 'car_rent_jizy',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
    CarModule,
    BookingModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
