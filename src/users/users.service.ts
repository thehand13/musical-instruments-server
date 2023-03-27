import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
      attributes: { exclude: ['passwordHash'] },
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
      attributes: { exclude: ['passwordHash'] },
    });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.rolesService.getRoleByValue('user');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async giveRole(giveRoleDto: GiveRoleDto) {
    const user = await this.userRepository.findByPk(giveRoleDto.userId, {
      include: ['roles'],
      attributes: { exclude: ['passwordHash'] },
    });
    const role = await this.rolesService.getRoleById(giveRoleDto.roleId);
    if (role && user) {
      await user.$add('roles', [role.id]);
      return user;
    }
    throw new HttpException(
      'There is no such role or user',
      HttpStatus.NOT_FOUND,
    );
  }
}
