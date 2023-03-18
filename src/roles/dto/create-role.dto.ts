import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role title',
  })
  readonly value: string;

  @ApiProperty({
    example: 'Can manage the shop',
    description: 'Role description',
  })
  readonly description: string;
}
