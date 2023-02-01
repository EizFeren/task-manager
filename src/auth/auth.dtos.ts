import { Length } from 'class-validator';

import { authErrorMessages } from 'src/auth/auth.constants';
import { Match } from 'src/auth/auth.decorators';

export class SignUpDto {
  @Length(5, 256, {
    message: authErrorMessages.signUp.validation.name.length,
  })
  name: string;

  @Length(7, 256, {
    message: authErrorMessages.signUp.validation.password.length,
  })
  password: string;

  @Match('password', {
    message: authErrorMessages.signUp.validation.password.repeat,
  })
  passwordRepeat: string;
}
