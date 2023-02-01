import { Injectable, ForbiddenException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'sequelize';

import { AuthHelper } from 'src/auth/auth.helper';
import { AuthRepository } from 'src/auth/auth.repository';
import { UserRepository } from 'src/user/user.repository';
import { SignUpDto, SignInDto, RefreshAuthTokenDto } from 'src/auth/auth.dtos';
import { SignUpOrSignInOutput } from 'src/auth/auth.outputs';
import { User } from 'src/user/user.model';
import { authErrorMessages } from 'src/auth/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private sequelize: Sequelize,
    private jwtService: JwtService,
    private authHelper: AuthHelper,
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

  async signUp(dto: SignUpDto): Promise<SignUpOrSignInOutput> {
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

  async signIn(dto: SignInDto): Promise<SignUpOrSignInOutput> {
    const transaction: Transaction = await this.sequelize.transaction();

    try {
      const user: User = await this.userRepository.findUser(dto, true, transaction, Transaction.LOCK.UPDATE);

      if (!user.confirmed) {
        throw new ForbiddenException(authErrorMessages.signIn.user.notConfirmed);
      }

      if (user.blocked) {
        throw new ForbiddenException(authErrorMessages.signIn.user.blocked);
      }

      await this.authHelper.checkPassword(dto.password, user.password);

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

  async refreshAuthToken(dto: RefreshAuthTokenDto): Promise<string> {
    const transaction: Transaction = await this.sequelize.transaction();

    try {
      const refreshToken = await this.authRepository.getRefreshToken(dto.refreshToken, true, transaction, Transaction.LOCK.UPDATE);
      const user: User = await refreshToken.$get('user', {
        transaction,
        lock: Transaction.LOCK.UPDATE,
      });
      const authToken: string = await this.jwtService.signAsync({
        id: user.id,
      });

      await transaction.commit();

      return authToken;
    }

    catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}
