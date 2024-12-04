import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';
@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column()
  city_mpg: number;

  @Column()
  highway_mpg: number;

  @Column()
  class: string;

  @Column()
  combination_mpg: number;

  @Column()
  cylinders: number;

  @Column()
  displacement: number; // corrected spelling

  @Column()
  drive: string;

  @Column()
  fuel_type: string;

  @Column()
  make: string;

  @Column()
  transmission: string;

  @Column({ default: true })
  is_available: boolean;

  @Column({ default: 1 })
  quantity: number;

  @OneToMany(() => Booking, (booking) => booking.car, { eager: true })
  booking: Booking[];
}
