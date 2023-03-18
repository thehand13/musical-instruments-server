import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from '../roles/role.model';
import { UserRoles } from 'src/users/user-roles.model';
import { Order } from 'src/orders/order.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRoles, Order])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
