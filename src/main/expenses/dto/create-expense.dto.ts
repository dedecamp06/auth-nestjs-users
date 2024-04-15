import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { dateFutureValidator } from './validators/dateFuture.validator.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'The description of the expense',
    example: 'Office supplies',
    maxLength: 191,
  })
  @IsNotEmpty({ message: 'Description is required.' })
  @MaxLength(191, { message: 'Description must not exceed 191 characters.' })
  description: string;

  @ApiProperty({
    description: 'The date when the expense occurred',
    example: '2023-04-03',
    type: 'string',
    format: 'date',
  })
  @IsDateString({}, { message: 'The date must be a valid date format.' })
  @IsNotEmpty({ message: 'Date is required.' })
  @Validate(dateFutureValidator, {
    message: 'The date cannot be in the future.',
  })
  date: string;

  @ApiProperty({
    description: 'The value of the expense in local currency',
    example: 150.5,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Value must be a number.' })
  @Min(0, { message: 'Value cannot be negative.' })
  value: number;

  @ApiProperty({
    description: 'The user ID of the person who incurred the expense',
    example: 1,
    type: 'integer',
  })
  @IsNumber({}, { message: 'User ID is invalid.' })
  @IsNotEmpty({ message: 'User ID is required.' })
  userId: number;
}
