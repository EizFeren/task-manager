import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { SignUpDto, SignInDto } from 'src/auth/auth.dtos';
import { SignUpOrSignInOutput } from 'src/auth/auth.outputs';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body()
    dto: SignUpDto,
  ): Promise<SignUpOrSignInOutput> {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  async signIn(
    @Body()
    dto: SignInDto,
  ): Promise<SignUpOrSignInOutput> {
    return this.authService.signIn(dto);
  }
}
