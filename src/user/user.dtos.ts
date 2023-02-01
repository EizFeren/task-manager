import { IsUUID } from 'class-validator';

import { userErrorMessages } from 'src/user/user.constants';

export class ConfirmUserDto {
  @IsUUID(4, {
    message: userErrorMessages.confirm.id,
  })
  id: string;
}
