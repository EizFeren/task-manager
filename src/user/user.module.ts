import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from 'src/user/user.role.model';
import { User } from 'src/user/user.model';
import { UserRepository } from 'src/user/user.repository';
import { UserHelper } from 'src/user/user.helper';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Role,
      User,
    ]),
  ],
  exports: [
    UserRepository,
    UserHelper,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserRepository,
    UserHelper,
    UserService,
  ],
})
export class UserModule {}
