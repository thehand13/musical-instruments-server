import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SignUpDto } from './sign-up.dto';

export class SetAdminDto extends SignUpDto {
  @ApiProperty({
    example: '00000000',
    description: 'Password for setting up admin profile',
  })
  @IsString()
  readonly setAdminPassword: string;
}
