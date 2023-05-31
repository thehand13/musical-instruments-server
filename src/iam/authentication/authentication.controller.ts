import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Auth } from '../decorators/authentication.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { AuthenticationService } from './authentication.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SetAdminDto } from './dto/set-admin.dto';

@ApiTags('Authentication')
@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Set admin profile' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post('set-admin')
  setAdmin(@Body() setAdminDto: SetAdminDto) {
    return this.authenticationService.setAdmin(setAdminDto);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authenticationService.signIn(signInDto);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshTokens(refreshTokenDto);
  }
}
