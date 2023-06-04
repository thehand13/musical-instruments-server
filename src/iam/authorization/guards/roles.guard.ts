import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { HttpException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/roles/role.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const token = request.cookies.accessToken;
      const user = this.jwtService.verify(token);
      request.user = user;
      return user.roles.some((role: Role) =>
        requiredRoles.includes(role.value),
      );
    } catch (error) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
