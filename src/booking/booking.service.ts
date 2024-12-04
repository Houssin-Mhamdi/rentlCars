import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Car)
    private readonly carRepo: Repository<Car>,
  ) {}
  async createBooking(createBookingDto: CreateBookingDto) {
    const car = await this.carRepo.findOne({
      where: { id: createBookingDto.car},
    });

    if (!car) {
      throw new Error('Car not found');
    }

    const booking = this.bookingRepo.create({
      car: car,
      customerName: createBookingDto.customerName,
      customerEmail: createBookingDto.customerEmail,
      customerPhone: createBookingDto.customerPhone,
      startDate: createBookingDto.startDate,
      startTime: createBookingDto.startTime,
      endDate: createBookingDto.endDate,
      endTime: createBookingDto.endTime,
    });

    return await this.bookingRepo.save(booking);
  }

  findAll() {
    return this.bookingRepo.find();
  }

  async updateBookingStatus(bookingId: number, status: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
    });

    //validation the status
    const validStatuses = ['pending', 'confirmed', 'canceled'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`,
      );
    }

    //find the booking
    if (!booking) {
      throw new Error('Booking not found');
    }

    //update the status
    booking.status = status;
    return await this.bookingRepo.save(booking);
  }

  findOne(id: number) {
    return this.bookingRepo.findOne({ where: { id: id } });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
