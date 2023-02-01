import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class AuthHelper {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 7);
  }
}
