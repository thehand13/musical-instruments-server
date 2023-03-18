import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Jackson RR24',
    description: 'Product title',
  })
  readonly title: string;

  @ApiProperty({
    example: '6 strings, H, 24 frets',
    description: 'Product description',
  })
  readonly description: string;

  @ApiProperty({
    example: '5.00',
    description: 'Product price',
  })
  readonly price: number;

  // @ApiProperty({
  //   example: '34',
  //   description: 'Product quantity',
  // })
  // readonly quantity: number;
}
