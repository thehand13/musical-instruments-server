import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GiveRoleDto {
  @ApiProperty({ example: '1', description: 'Role ID' })
  @IsNumber({}, { message: 'Should be number' })
  readonly value: string;

  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNumber({}, { message: 'Should be number' })
  readonly userId: string;
}
