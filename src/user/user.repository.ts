import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction, UniqueConstraintError, LOCK } from 'sequelize';

import { User } from 'src/user/user.model';
import { Role } from 'src/user/user.role.model';
import { CreateUserInput, FindUserInput, EditUserInput } from 'src/user/user.inputs';
import { UserRoles } from 'src/user/user.enums';
import { userErrorMessages } from 'src/user/user.constants';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async createUser(input: CreateUserInput, transaction?: Transaction): Promise<User> {
    try {
      const user: User = await this.userModel.create({
        ...input,
        roleName: UserRoles.user,
      }, {
        fields: [
          'name',
          'password',
          'roleName',
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

  async findUser(input: FindUserInput, rejectOnEmpty: boolean = false, transaction?: Transaction, lock?: LOCK): Promise<User> {
    const user: User = await this.userModel.findOne({
      where: {
        name: input.name,
      },
      transaction,
      lock,
    });

    if (rejectOnEmpty && !user) {
      throw new NotFoundException(userErrorMessages.notFound);
    }

    return user;
  }

  async getUser(id: string, rejectOnEmpty: boolean = false, transaction?: Transaction, lock?: LOCK): Promise<User> {
    const user: User = await this.userModel.findByPk(id, {
      transaction,
      lock,
    });

    if (rejectOnEmpty && !user) {
      throw new NotFoundException(userErrorMessages.notFound);
    }

    return user;
  }

  async editUser(input: EditUserInput, user: User, transaction?: Transaction): Promise<void> {
    await user.update({
      ...input,
    }, {
      fields: [
        'name',
        'password',
        'roleName',
        'confirmed',
        'blocked',
      ],
      transaction,
    });
  }
}
