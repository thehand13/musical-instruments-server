import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'dashasdhasdhaadshadsfhjdsf',
    description: 'Refresh token',
  })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
