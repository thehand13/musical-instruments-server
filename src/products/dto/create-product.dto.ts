import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Jackson RR24',
    description: 'Product title',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: '6 strings, H, 24 frets',
    description: 'Product description',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: '5.00',
    description: 'Product price',
  })
  @IsString()
  readonly price: string;
}
