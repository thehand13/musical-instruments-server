import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/product.model';
import { Order } from './order.model';

interface OrderProductsCreationAttributes {
  productId: number;
  orderId: number;
  productQuantity: number;
}

@Table({ tableName: 'order_products', createdAt: false, updatedAt: false })
export class OrderProducts extends Model<
  OrderProducts,
  OrderProductsCreationAttributes
> {
  @ApiProperty({ example: '1', description: 'Order product ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '4', description: 'Product quantity' })
  @Column({
    type: DataType.INTEGER,
  })
  productQuantity: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
