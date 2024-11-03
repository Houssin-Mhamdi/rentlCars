import { Role } from 'src/product/dto/Role-User.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  // address?: string;
  // @Column()
  // phone?: string;
  @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  role: Role;
}
