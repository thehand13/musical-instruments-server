import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import { User } from 'src/users/user.model';
import { OrderProducts } from './order-products.model';

interface OrderCreationAttributes {
  deliveryDate: number;
  deliveryAddress: string;
  orderProducts: OrderProducts[];
  userId: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttributes> {
  @ApiProperty({
    example: '1',
    description: 'Order ID',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '3623626326236',
    description: 'Order delivery date (milliseconds)',
  })
  @Column({
    type: DataType.BIGINT,
  })
  deliveryDate: number;

  @ApiProperty({
    example: 'Moscow, Malaya Kaluzhskaya Street, 1',
    description: 'Order delivery address',
  })
  @Column({
    type: DataType.STRING,
  })
  deliveryAddress: string;

  @ApiProperty({
    example: '1',
    description: 'User ID',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderProducts)
  orderProducts: OrderProducts[];
}
