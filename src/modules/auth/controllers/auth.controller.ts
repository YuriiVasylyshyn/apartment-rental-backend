import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SignInRequestDto } from '../dtos/req/sign-in.request.dto';
import { SignUpRequestDto } from '../dtos/req/sign-up.request.dto';
import { AuthService } from '../services/auth.service.abstract';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  public async signup(@Body() data: SignUpRequestDto): Promise<string> {
    return this._authService.signUp(data);
  }

  @ApiOperation({ summary: 'Saves jwt token into cookies' })
  @Post('/signin')
  public async signin(@Body() data: SignInRequestDto, @Res({ passthrough: true }) response: Response): Promise<void> {
    return this._authService.signIn(data, response);
  }
}
