import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import type { User } from '../../../decorators/user.decorator';
import type { Config } from '@app/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService<Config, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies.Authentication as string]),
      secretOrKey: configService.get('jwt.secret', { infer: true }),
    });
  }

  override validate(payload: User): User {
    return payload;
  }
}
