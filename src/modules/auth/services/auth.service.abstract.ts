import { Response } from 'express';

import { SignInRequestDto } from '../dtos/req/sign-in.request.dto';
import { SignUpRequestDto } from '../dtos/req/sign-up.request.dto';

export abstract class AuthService {
  public abstract signUp(data: SignUpRequestDto): Promise<string>;
  public abstract signIn(data: SignInRequestDto, response: Response): Promise<void>;
}
