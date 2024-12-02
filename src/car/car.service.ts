import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { CarQueryParamsDto } from './dto/car-query-params.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly CarRepo: Repository<Car>,
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
}
