import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/product.model';
import { Order } from './order.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class OrderProducts extends Model<OrderProducts> {
  @ApiProperty({ example: '1', description: 'Order product ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Order ID' })
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  orderId: number;

  @ApiProperty({ example: '1', description: 'Product ID' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @ApiProperty({ example: '4', description: 'Product quantity' })
  @Column({
    type: DataType.INTEGER,
  })
  productQuantity: number;
}
