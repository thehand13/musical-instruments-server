import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('rolesService')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  @Get()
  getAllROles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.rolesService.getRoleById(id);
  }

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Patch(':id')
  updateORole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
