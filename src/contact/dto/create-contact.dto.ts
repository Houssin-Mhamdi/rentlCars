import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
