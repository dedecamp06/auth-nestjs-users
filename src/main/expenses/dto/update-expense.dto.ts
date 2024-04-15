import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import {
  IsDateString,
  IsEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { dateFutureValidator } from './validators/dateFuture.validator.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional({
    description: 'Optional: The description of the expense',
    example: 'Updated office supplies',
    maxLength: 191,
  })
  @IsOptional()
  @MaxLength(191, { message: 'Description must not exceed 191 characters.' })
  description: string;

  @ApiPropertyOptional({
    description: 'Optional: The date when the expense occurred',
    example: '2023-05-10',
  })
  @IsDateString({}, { message: 'The date must be a valid date format.' })
  @IsEmpty({ message: 'Date is required.' })
  @Validate(dateFutureValidator, {
    message: 'The date cannot be in the future.',
  })
  date: string;

  @ApiPropertyOptional({
    description: 'Optional: The value of the expense in local currency',
    example: 200.0,
  })
  @IsNumber({}, { message: 'Value must be a number.' })
  @Min(0, { message: 'Value cannot be negative.' })
  @IsOptional()
  value: number;

  @ApiPropertyOptional({
    description: 'Optional: The user ID of the person who incurred the expense',
    example: 2,
  })
  @IsNumber({}, { message: 'User ID is invalid.' })
  @IsOptional()
  userId: number;
}
