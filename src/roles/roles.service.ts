import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getAllRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  async getRoleById(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });
    return role;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto);
    return role;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.update(
      { ...updateRoleDto },
      { where: { id } },
    );
    return role;
  }

  async deleteRole(id: string) {
    const role = await this.roleRepository.destroy({ where: { id } });
    return role;
  }
}
