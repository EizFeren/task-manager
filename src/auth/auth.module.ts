import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { RefreshToken } from 'src/auth/auth.refresh-token.model';
import { AuthConfig } from 'src/auth/auth.config';
import { ConfigDomains } from 'src/config/config.enums';
import { UserModule } from 'src/user/user.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthHelper } from 'src/auth/auth.helper';
import { AuthRepository } from 'src/auth/auth.repository';
import { AuthService } from 'src/auth/auth.service';
import { AuthJwtStrategy } from 'src/auth/jwt/auth.jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([
      RefreshToken,
    ]),
    JwtModule.registerAsync({
      inject: [
        ConfigService,
      ],
      useFactory(configService: ConfigService): JwtModuleOptions {
        const authConfig: AuthConfig =  configService.get<AuthConfig>(ConfigDomains.auth);

        return authConfig.jwt;
      },
    }),
    PassportModule,
    UserModule,
  ],
  exports: [],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthHelper,
    AuthRepository,
    AuthService,
    AuthJwtStrategy,
  ],
})
export class AuthModule {}
