import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from 'src/user/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
    ]),
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class UserModule {}
