import { ApiProperty } from '@nestjs/swagger';

interface OrderProductsDto {
  readonly productId: number;
  readonly productQuantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: '1679785631451',
    description: 'Order delivery date (milliseconds)',
  })
  readonly deliveryDate: number;

  @ApiProperty({
    example: 'Moscow, Malaya Kaluzhskaya Street, 1',
    description: 'Order delivery address',
  })
  readonly deliveryAddress: string;

  @ApiProperty({
    example:
      '[{ productId: 1, productQuantity: 2 }, { productId: 2, productQuantity: 3 }, { productId: 3, productQuantity: 4 }]',
    description: 'Order products` ID list',
  })
  readonly products: OrderProductsDto[];
}
