import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';

import { AuthJwtGuard } from 'src/auth/jwt/auth.jwt.guard';
import { UserService } from 'src/user/user.service';
import { AuthRoleGuard } from 'src/auth/auth.guards';
import { CurrentUser } from 'src/user/user.decorators';
import { User } from 'src/user/user.model';
import { UserOutput } from 'src/user/user.outputs';
import { UserRoles } from 'src/user/user.enums';
import { ConfirmUserDto } from 'src/user/user.dtos';

@Controller('users')
@UseGuards(AuthJwtGuard)
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Get('me')
  getCurrentUser(
    @CurrentUser()
    user: User,
  ): UserOutput {
    return user.serialize();
  }

  @Post('confirm')
  @UseGuards(AuthRoleGuard(UserRoles.owner))
  async confirmUser(
    @Body()
    dto: ConfirmUserDto,
  ): Promise<void> {
    await this.userService.confirmUser(dto);
  }
}
