import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/auth.dtos';
import { SignUpOutput } from 'src/auth/auth.outputs';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body()
    dto: SignUpDto,
  ): Promise<SignUpOutput> {
    return this.authService.signUp(dto);
  }
}
