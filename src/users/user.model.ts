import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.model';
import { UserRoles } from 'src/users/user-roles.model';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/order.model';

interface UserCreationAttributes {
  email: string;
  passwordHash: string;
  name: string;
  surname: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'User ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@example.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'sdha2ewtygebrg823',
    description: 'User password hash',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash: string;

  @ApiProperty({ example: 'Roman', description: 'User name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'Petrov', description: 'User surname' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Order)
  orders: Order[];
}
