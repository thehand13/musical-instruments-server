import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SetAdminDto } from './dto/set-admin.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.getUserByEmail(signUpDto.email);
    if (user) {
      throw new UnauthorizedException('User with this email already exists');
    }
    const passwordHash = await this.hashingService.hash(signUpDto.password);
    const userDto = { ...signUpDto, passwordHash };
    delete userDto.password;
    await this.usersService.createUser(userDto);
    return { message: 'Account was successfully created' };
  }

  async setAdmin(setAdminDto: SetAdminDto) {
    if (setAdminDto.setAdminPassword !== process.env.ADMIN_SET_PASSWORD) {
      throw new UnauthorizedException('Wrong password');
    }
    let adminRole = await this.rolesService.getRoleByValue('admin');
    if (adminRole) {
      throw new UnauthorizedException('Admin role already exists');
    }
    adminRole = await this.rolesService.createRole({
      value: 'admin',
      description: 'Can manage shop',
    });
    let userRole = await this.rolesService.getRoleByValue('user');
    if (!userRole) {
      userRole = await this.rolesService.createRole({
        value: 'user',
        description: 'Can buy products',
      });
    }
    const signUpDto = { ...setAdminDto };
    delete signUpDto.setAdminPassword;
    const message = await this.signUp(signUpDto);
    const user = await this.usersService.getUserByEmail(setAdminDto.email);
    const admin = await this.usersService.giveRole({
      roleId: adminRole.id,
      userId: user.id,
    });
    return message;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.getUserByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('User with this email doesn`t exists');
    }
    const passwordIsRight = await this.hashingService.compare(
      signInDto.password,
      user.passwordHash,
    );
    if (!passwordIsRight) {
      throw new UnauthorizedException('Wrong password!');
    }
    return await this.generateTokens(user);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audiece,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.usersService.getUserById(sub);
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, roles: user.roles },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    return { accessToken, refreshToken };
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audiece,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
