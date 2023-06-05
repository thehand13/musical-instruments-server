import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';
import { Product } from './product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/orders/order.model';
import { OrderProducts } from 'src/orders/order-products.model';
import { FilesModule } from 'src/files/files.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Order, OrderProducts]),
    FilesModule,
    OrdersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
