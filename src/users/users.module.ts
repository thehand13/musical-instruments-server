import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from '../roles/role.model';
import { UserRoles } from 'src/users/user-roles.model';
import { Order } from 'src/orders/order.model';
import { RolesModule } from 'src/roles/roles.module';
import { IamModule } from 'src/iam/iam.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Order]),
    RolesModule,
    forwardRef(() => IamModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
