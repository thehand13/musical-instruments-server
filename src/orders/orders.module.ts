import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderProducts } from './order-products.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderProducts])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
