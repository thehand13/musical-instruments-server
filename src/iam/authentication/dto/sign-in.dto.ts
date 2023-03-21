import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'example@example.com', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '00000000',
    description: 'User password',
  })
  @MinLength(8)
  readonly password: string;
}
