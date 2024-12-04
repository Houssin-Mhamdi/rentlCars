import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { CarQueryParamsDto } from './dto/car-query-params.dto';
import { Booking } from 'src/booking/entities/booking.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly CarRepo: Repository<Car>,

    @InjectRepository(Booking)
    private readonly BookingRepo: Repository<Booking>,
  ) {}

  create(createCarDto: CreateCarDto) {
    const car = this.CarRepo.create(createCarDto);
    return this.CarRepo.save(car);
  }

  async findAll(queryParams: CarQueryParamsDto) {
    const {
      search,
      sortField,
      sortOrder,
      page = 1,
      limit = 10,
      color,
      cylinders,
      year,
      fuel_type,
      model,
      make,
    } = queryParams;

    const queryBuilder = this.CarRepo.createQueryBuilder('car');

    // Filtering
    if (color) {
      queryBuilder.andWhere('car.color = :color', { color });
    }

    if (model) {
      queryBuilder.andWhere('car.model = :model', { model });
    }
    if (make) {
      queryBuilder.andWhere('car.make = :make', { make });
    }

    if (cylinders) {
      queryBuilder.andWhere('car.cylinders = :cylinders', { cylinders });
    }

    if (fuel_type) {
      queryBuilder.andWhere('car.fuel_type = :fuel_type', { fuel_type });
    }
    if (year) {
      queryBuilder.andWhere('car.year = :year', { year });
    }

    //searching
    if (search) {
      queryBuilder.andWhere(
        '(car.model LIKE :search OR car.make LIKE :search OR car.fuel_type LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Sorting
    const allowedFields = ['price', 'year', 'model', 'make'];
    if (sortField && sortOrder && allowedFields.includes(sortField)) {
      queryBuilder.orderBy(
        `car.${sortField}`,
        sortOrder.toUpperCase() as 'ASC' | 'DESC',
      );
    }

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    // Execute query
    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.CarRepo.findOne({ where: { id } });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.CarRepo.update(id, updateCarDto);
  }

  remove(id: number) {
    return this.CarRepo.delete(id);
  }

  async decreseCarQuantity(carId: number) {
    const car = await this.CarRepo.findOne({ where: { id: carId } });
    if (!car) throw new NotFoundException('Car not found');

    if (car.quantity <= 0) throw new BadRequestException('No cars availble');

    car.quantity -= 1;

    if (car.quantity === 0) car.is_available = false;
    return this.CarRepo.save(car);
  }

  async increaseCarQuantity(carId: number) {
    const car = await this.CarRepo.findOne({ where: { id: carId } });

    if (!car) throw new NotFoundException('Car not found');

    car.quantity += 1;
    car.is_available = true;
    return this.CarRepo.save(car);
  }

  async updateReservationStatus(bookingId: number, status: string) {
    const booking = await this.BookingRepo.findOne({
      where: { id: bookingId },
      relations: ['car'],
    });

    if (!booking)
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);

    if (
      booking.status === 'completed' ||
      booking.status === 'canceled' ||
      (status === 'confirmed' && booking.status === 'confirmed')
    ) {
      throw new BadRequestException(
        `Booking with ID ${bookingId} is already ${booking.status} and cannot be updated further.`
      );
    }

    if (status === 'confirmed') {
      await this.decreseCarQuantity(booking.car.id);
    } else if (status === 'canceled') {
      await this.increaseCarQuantity(booking.car.id);
     
    }

    booking.status = status;
    return this.BookingRepo.save(booking);
  }
}
