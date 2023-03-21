import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
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
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
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
