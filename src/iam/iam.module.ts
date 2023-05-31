import { forwardRef, Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RolesGuard } from './authorization/guards/roles.guard';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    forwardRef(() => UsersModule),
    RolesModule,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    { provide: APP_GUARD, useClass: RolesGuard },
    AccessTokenGuard,
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService, JwtModule],
})
export class IamModule {}
