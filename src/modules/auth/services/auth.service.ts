import { Response } from 'express';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config } from '@app/config';
import { EncryptUtility } from '@app/utils/encrypt.utility';
import { UserService } from '../../user/services/user.service.abstract';
import { SignInRequestDto } from '../dtos/req/sign-in.request.dto';
import { SignUpRequestDto } from '../dtos/req/sign-up.request.dto';
import { AuthService } from './auth.service.abstract';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService<Config, true>,
  ) {}

  public async signUp(data: SignUpRequestDto): Promise<string> {
    const { email, fullName, password, role } = data;

    const userExists = await this._userService.checkIfUserExistsByEmail(email);

    if (userExists) {
      throw new ForbiddenException('User already exists');
    }

    const encryptedPassword = await EncryptUtility.generateHash(password);

    return this._userService.saveUserAndReturnId({
      email,
      fullName,
      role,
      password: encryptedPassword,
    });
  }

  public async signIn(data: SignInRequestDto, response: Response): Promise<void> {
    const { email, password } = data;
    const user = await this._userService.findOneByEmail(email);

    if (!user.isRegistrationCompleted) {
      throw new ForbiddenException('Confirm your email first');
    }

    const isPasswordValid = await EncryptUtility.compareHash(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = await this._jwtService.signAsync({ id: user.id, role: user.role });

    const accessTokenExpirationTimeSeconds = this._configService.get('jwt.accessTokenExpirationTimeSeconds', {
      infer: true,
    });

    response.cookie('Authentication', token, {
      secure: this._configService.get('stage', { infer: true }) !== 'local',
      expires: new Date(Date.now() + accessTokenExpirationTimeSeconds * 1000),
    });
  }
}
