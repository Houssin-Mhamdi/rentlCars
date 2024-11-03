import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  city_mpg: number;

  @IsNotEmpty()
  @IsNumber()
  highway_mpg: number;

  @IsNotEmpty()
  @IsString()
  class: string;

  @IsNotEmpty()
  @IsNumber()
  combination_mpg: number;

  @IsNotEmpty()
  @IsNumber()
  cylinders: number;

  @IsNotEmpty()
  @IsNumber()
  displacement: number; // corrected spelling

  @IsNotEmpty()
  @IsString()
  drive: string;

  @IsNotEmpty()
  @IsString()
  fuel_type: string;

  @IsNotEmpty()
  @IsString()
  make: string;

  @IsString()
  transmission: string; // corrected spelling
}
