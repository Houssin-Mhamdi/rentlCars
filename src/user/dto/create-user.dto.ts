import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/product/dto/Role-User.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'please provide a valid email' })
  email: string;
  @IsNotEmpty({ message: 'password is required' })
  password: string;
//   address?: string;
//   phone?: string;
  role: Role;
}
