import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction, LOCK } from 'sequelize';

import { RefreshToken } from 'src/auth/auth.refresh-token.model';
import { CreateRefreshTokenInput } from 'src/auth/auth.inputs';
import { authErrorMessages } from 'src/auth/auth.constants';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(RefreshToken)
    private refreshTokenModel: typeof RefreshToken,
  ) {}

  async createRefreshToken(input: CreateRefreshTokenInput, transaction?: Transaction): Promise<RefreshToken> {
    return this.refreshTokenModel.create({
      ...input,
    }, {
      fields: [
        'value',
        'userId',
      ],
      transaction,
    });
  }

  async getRefreshToken(id: string, rejectOnEmpty: boolean = false, transaction?: Transaction, lock?: LOCK): Promise<RefreshToken> {
    const refreshToken: RefreshToken = await this.refreshTokenModel.findByPk(id, {
      transaction,
      lock,
    });

    if (rejectOnEmpty && !refreshToken) {
      throw new NotFoundException(authErrorMessages.refresAuthToken.notFound);
    }

    return refreshToken;
  }
}
