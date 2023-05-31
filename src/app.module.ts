import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.model';
import { UserRoles } from './users/user-roles.model';
import { Product } from './products/product.model';
import { Order } from './orders/order.model';
import { OrderProducts } from './orders/order-products.model';
import { IamModule } from './iam/iam.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    OrdersModule,
    RolesModule,
    UsersModule,
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_HOST),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Product, Order, OrderProducts],
      autoLoadModels: true,
      synchronize: true,
    }),
    IamModule,
    FilesModule,
  ],
})
export class AppModule {}
