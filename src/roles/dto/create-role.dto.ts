import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role title',
  })
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({
    example: 'Can manage the shop',
    description: 'Role description',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
