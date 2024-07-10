import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  rentalPrice: number;

  @IsString()
  description: string;
}

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
    @IsNotEmpty()
    @IsString()
    id: string;
}