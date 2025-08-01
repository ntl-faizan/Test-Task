import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The unique email address of the user',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({
    example: 'strongPass123',
    description: 'User password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;
}
