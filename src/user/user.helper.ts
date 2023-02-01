import { Injectable, ForbiddenException } from '@nestjs/common';

import { User } from 'src/user/user.model';
import { userErrorMessages } from 'src/user/user.constants';

@Injectable()
export class UserHelper {
  validateUser(user: User): void {
    if (!user.confirmed) {
      throw new ForbiddenException(userErrorMessages.notConfirmed);
    }

    if (user.blocked) {
      throw new ForbiddenException(userErrorMessages.blocked);
    }
  }
}
