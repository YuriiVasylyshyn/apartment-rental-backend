import * as bcrypt from 'bcrypt';

export class EncryptUtility {
  public static generateHash(data: string, rounds = 10): Promise<string> {
    return bcrypt.hash(data, rounds);
  }

  public static compareHash(pass: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pass, hash);
  }
}
