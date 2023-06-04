import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: HttpStatus.OK, type: [Order] })
  @Roles('admin')
  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Order })
  @Roles('admin')
  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(+id);
  }

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Order })
  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.ordersService.createOrder(createOrderDto, activeUser.sub);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Order })
  @Roles('admin')
  @Delete(':id')
  executeOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(+id);
  }
}
