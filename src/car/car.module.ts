import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Booking } from 'src/booking/entities/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car,Booking]),
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService], // Export service if used in other modules
})
export class CarModule {}
