import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderProducts } from 'src/orders/order-products.model';
import { Order } from 'src/orders/order.model';

interface ProductCreationAttributes {
  title: string;
  description: string;
  price: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttributes> {
  @ApiProperty({
    example: '1',
    description: 'Product ID',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Jackson RR24',
    description: 'Product title',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: '6 strings, H, 24 frets',
    description: 'Product description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: '5.00',
    description: 'Product price',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @BelongsToMany(() => Order, () => OrderProducts)
  orders: Order[];
}
