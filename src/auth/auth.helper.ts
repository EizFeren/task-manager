import { Injectable, BadRequestException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { authErrorMessages } from 'src/auth/auth.constants';

@Injectable()
export class AuthHelper {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 7);
  }

  async checkPassword(password: string, hash: string): Promise<void> {
    const result: boolean = await compare(password, hash);

    if (!result) {
      throw new BadRequestException(authErrorMessages.signIn.user.password.missmatch);
    }
  }
}
