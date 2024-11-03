import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.CarRepo.find();
  }

  findOne(id: number) {
    return this.CarRepo.findOne({ where: { id } });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
