import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
