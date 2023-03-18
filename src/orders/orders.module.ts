import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/product.model';
import { Order } from './order.model';
import { OrderProducts } from './order-products.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, Order, OrderProducts])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
