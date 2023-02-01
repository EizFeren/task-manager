import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from 'src/user/user.model';
import { UserRepository } from 'src/user/user.repository';
import { UserHelper } from 'src/user/user.helper';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
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
  ],
})
export class UserModule {}
