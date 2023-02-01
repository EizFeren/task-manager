import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

import { UserRepository } from 'src/user/user.repository';
import { ConfirmUserDto } from 'src/user/user.dtos';
import { User } from 'src/user/user.model';

@Injectable()
export class UserService {
  constructor(
    private sequelize: Sequelize,
    private userRepository: UserRepository,
  ) {}

  async confirmUser(dto: ConfirmUserDto): Promise<void> {
    const transaction: Transaction = await this.sequelize.transaction();

    try {
      const user: User = await this.userRepository.getUser(dto.id, true, transaction, Transaction.LOCK.UPDATE);

      await this.userRepository.editUser(
        {
          confirmed: true,
        },
        user,
        transaction,
      );
      await transaction.commit();
    }

    catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}
