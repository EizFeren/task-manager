import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { RefreshToken } from 'src/auth/auth.refresh-token.model';
import { CreateRefreshTokenInput } from 'src/auth/auth.inputs';

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
}
