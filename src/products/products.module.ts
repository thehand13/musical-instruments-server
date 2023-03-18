import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';
import { Product } from './product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/orders/order.model';
import { OrderProducts } from 'src/orders/order-products.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, Order, OrderProducts])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
