import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../car/entities/car.entity'; // Adjust the import path based on your project structure

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.id, { eager: true }) // Relation with the Car entity
  carId: Car;
  @ManyToOne(() => Car, (car) => car.booking)
  car: Car;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  customerPhone: string;

  @Column('date')
  startDate: Date;
  @Column()
  startTime: string;

  @Column('date')
  endDate: Date;

  @Column()
  endTime: string;

  @Column({ default: 'pending' })
  status: string; // e.g., 'pending', 'confirmed', 'cancelled'
}
