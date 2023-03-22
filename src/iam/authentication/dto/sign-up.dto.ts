import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'example@example.com', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '00000000',
    description: 'User password',
  })
  @MinLength(8)
  readonly password: string;

  @ApiProperty({ example: 'Roman', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Petrov', description: 'User surname' })
  @IsNotEmpty()
  @IsString()
  readonly surname: string;
}
