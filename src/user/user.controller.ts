import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthJwtGuard } from 'src/auth/jwt/auth.jwt.guard';
import { CurrentUser } from 'src/user/user.decorators';
import { User } from 'src/user/user.model';
import { UserOutput } from 'src/user/user.outputs';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(AuthJwtGuard)
  getCurrentUser(
    @CurrentUser()
    user: User,
  ): UserOutput {
    return user.serialize();
  }
}
