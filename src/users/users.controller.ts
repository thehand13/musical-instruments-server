import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { GiveRoleDto } from './dto/give-role.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles('admin')
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user (and related info) by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Roles('admin')
  @Get('by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @ApiOperation({ summary: 'Get user (and related info) by token' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get('by-token')
  getUserByToken(@ActiveUser() activeUser: ActiveUserData) {
    return this.usersService.getUserById(activeUser.sub);
  }

  @ApiOperation({ summary: 'Give user a role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Roles('admin')
  @Post('give-role')
  giveRole(@Body() giveRoleDto: GiveRoleDto) {
    return this.usersService.giveRole(giveRoleDto);
  }
}
