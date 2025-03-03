import type { SignUpRequestDto } from '../../auth/dtos/req/sign-up.request.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class UserService {
  public abstract findOneByEmail(email: string): Promise<UserEntity>;
  public abstract checkIfUserExistsByEmail(email: string): Promise<boolean>;
  public abstract saveUserAndReturnId(data: SignUpRequestDto): Promise<string>;
}
