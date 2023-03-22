import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderProducts } from './order-products.model';
import { Order } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(OrderProducts)
    private orderProductsRepository: typeof OrderProducts,
  ) {}

  async getAllOrders() {
    const orders = await this.orderRepository.findAll();
    return orders;
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);
    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.update(
      { ...updateOrderDto },
      { where: { id } },
    );
    return order;
  }

  async deleteOrder(id: string) {
    const order = await this.orderRepository.destroy({ where: { id } });
    return order;
  }
}
