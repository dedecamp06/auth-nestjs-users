import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty({ description: 'Password for the user account', example: 'securePassword123', minLength: 8 })
  @IsNotEmpty({ message: 'Password is required.' })
  @Length(5, undefined, {
    message: 'Password must be at least 5 characters long.',
  })
  password: string;
}
