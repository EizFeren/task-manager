import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction, UniqueConstraintError } from 'sequelize';

import { User } from 'src/user/user.model';
import { CreateUserInput } from 'src/user/user.inputs';
import { UserRoles } from 'src/user/user.enums';
import { userErrorMessages } from 'src/user/user.constants';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(input: CreateUserInput, transaction?: Transaction): Promise<User> {
    try {
      const user: User = await this.userModel.create({
        ...input,
        role: UserRoles.user,
      }, {
        fields: [
          'name',
          'password',
          'role',
        ],
        transaction,
      });

      return user;
    }

    catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException(userErrorMessages.nameUnique);
      }

      throw error;
    }
  }
}
