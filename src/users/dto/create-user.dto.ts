import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({
    example: 'sdha2ewtygebrg823',
    description: 'User password',
  })
  readonly password: string;

  @ApiProperty({ example: 'Roman', description: 'User name' })
  readonly name: string;

  @ApiProperty({ example: 'Petrov', description: 'User surname' })
  readonly surname: string;
}
