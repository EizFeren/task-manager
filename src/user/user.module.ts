import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from 'src/user/user.model';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
    ]),
  ],
  exports: [
    UserRepository,
  ],
  controllers: [],
  providers: [
    UserRepository,
  ],
})
export class UserModule {}
