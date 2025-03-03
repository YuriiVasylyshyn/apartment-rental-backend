import type { SignInRequestDto } from '../dtos/req/sign-in.request.dto';
import type { SignUpRequestDto } from '../dtos/req/sign-up.request.dto';
import type { Response } from 'express';

export abstract class AuthService {
  public abstract signUp(data: SignUpRequestDto): Promise<string>;
  public abstract signIn(data: SignInRequestDto, response: Response): Promise<void>;
}
