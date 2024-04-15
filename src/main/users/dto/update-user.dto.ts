import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Updated name of the user',
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiPropertyOptional({
    description: 'Updated email address of the user',
    example: 'jane.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsOptional()
  email: string;

  @ApiPropertyOptional({
    description: 'Updated password for the user account',
    example: 'newSecurePassword123',
    minLength: 8,
  })
  @IsOptional()
  @Length(8, undefined, {
    message: 'Password must be at least 8 characters long.',
  })
  password: string;
}
