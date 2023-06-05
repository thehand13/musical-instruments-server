import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
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
    const orders = await this.orderRepository.findAll({
      include: { all: true },
    });
    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (order) {
      return order;
    }
    throw new HttpException('Order not found', HttpStatus.BAD_REQUEST);
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: number) {
    try {
      const order = await this.orderRepository.create({
        deliveryDate: createOrderDto.deliveryDate,
        deliveryAddress: createOrderDto.deliveryAddress,
        userId,
      });
      await Promise.all(
        createOrderDto.products.map(async (product) => {
          const orderProduct = await this.orderProductsRepository.create({
            ...product,
            orderId: order.id,
          });
          return orderProduct;
        }),
      );
      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.destroy({ where: { id } });
    await this.orderProductsRepository.destroy({ where: { orderId: id } });
    return order;
  }

  async deleteProductFromAllOrders(id: number) {
    await this.orderProductsRepository.destroy({ where: { productId: id } });
    return true;
  }
}
