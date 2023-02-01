import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { AuthStrategyNames } from 'src/auth/auth.enums';
import { UserRepository } from 'src/user/user.repository';
import { UserHelper } from 'src/user/user.helper';
import { AuthConfig } from 'src/auth/auth.config';
import { ConfigDomains } from 'src/config/config.enums';
import { AuthJwtPayload } from 'src/auth/jwt/auth.jwt.payload';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, AuthStrategyNames.jwt) {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
    private userHelper: UserHelper,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<AuthConfig>(ConfigDomains.auth).jwt.secret,
      jsonWebTokenOptions: {
        maxAge: configService.get<AuthConfig>(ConfigDomains.auth).jwt.verifyOptions.maxAge,
      },
    });
  }

  async validate(payload: AuthJwtPayload): Promise<User> {
    const user: User = await this.userRepository.getUser(payload.id, true);

    this.userHelper.validateUser(user);

    return user;
  }
}
