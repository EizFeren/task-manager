import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthStrategyNames } from 'src/auth/auth.enums';

@Injectable()
export class AuthJwtGuard extends AuthGuard(AuthStrategyNames.jwt) {}
