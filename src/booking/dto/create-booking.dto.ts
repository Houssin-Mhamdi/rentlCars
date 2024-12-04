import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  car: any; // Refers to the car ID being booked

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()// Null allows international format validation
  customerPhone: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  startTime: string; // Time as a string in 'HH:mm:ss' format

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  endTime: string; // Time as a string in 'HH:mm:ss' format
  
  @IsOptional()
  @IsString()
  status: string;
}
