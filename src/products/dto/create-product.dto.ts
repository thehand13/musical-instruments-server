import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Fender Stratocaster',
    description: 'Product title',
  })
  readonly title: string;

  @ApiProperty({
    example: '6 strings, H-H, Floyd Rose Tremolo',
    description: 'Product description',
  })
  readonly description: string;
}
