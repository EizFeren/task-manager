import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'sequelize';

import { AuthHelper } from 'src/auth/auth.helper';
import { AuthRepository } from 'src/auth/auth.repository';
import { UserRepository } from 'src/user/user.repository';
import { SignUpDto } from 'src/auth/auth.dtos';
import { SignUpOutput } from 'src/auth/auth.outputs';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private sequelize: Sequelize,
    private jwtService: JwtService,
    private authHelper: AuthHelper,
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

  async signUp(dto: SignUpDto): Promise<SignUpOutput> {
    const transaction: Transaction = await this.sequelize.transaction();

    try {
      dto.password = await this.authHelper.hashPassword(dto.password);

      const user: User = await this.userRepository.createUser(dto, transaction);
      const [ authToken, refreshToken, ] = await Promise.all([
        this.jwtService.signAsync({
          id: user.id,
        }),
        this.authRepository.createRefreshToken(
          {
            userId: user.id,
          },
          transaction,
        ),
      ]);

      await transaction.commit();

      return {
        authToken,
        refreshToken: refreshToken.id,
      };
    }

    catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}
