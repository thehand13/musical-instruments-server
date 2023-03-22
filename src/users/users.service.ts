import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const userResponse = user;
    delete user.dataValues.id;
    return userResponse;
  }

  async getAllUsers(activeUser: ActiveUserData) {
    const users = await this.userRepository.findAll({
      attributes: { exclude: ['passwordHash'] },
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
}
