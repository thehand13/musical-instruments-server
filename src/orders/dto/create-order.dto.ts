import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: '1',
    description: 'User ID',
  })
  readonly userId: number; // change to token after adding auth section!!!

  @ApiProperty({
    example: '3623626326236',
    description: 'Order delivery date (milliseconds)',
  })
  readonly deliveryDate: number;

  @ApiProperty({
    example: 'Moscow, Malaya Kaluzhskaya Street, 1',
    description: 'Order delivery address',
  })
  readonly deliveryAddress: string;

  @ApiProperty({
    example: '[ 1, 1, 3, 2, 6 ]',
    description: 'Order products` ID list',
  })
  readonly productIdList: number[];
}
