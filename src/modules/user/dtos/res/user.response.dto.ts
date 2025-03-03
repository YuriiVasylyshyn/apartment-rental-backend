import type { UserEntity } from '../../entities/user.entity';
import type { Role } from '../../enums/role.enum';

export class UserResponse {
  public id!: string;
  public role!: Role;
  public fullName!: string | null;
  public email!: string | null;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.role = user.role;
    this.email = user.email;
    this.fullName = user.fullName;
  }
}
