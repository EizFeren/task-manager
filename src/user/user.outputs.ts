import { Expose } from 'class-transformer';

import { UserRoles } from 'src/user/user.enums';

export class UserOutput {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  role: UserRoles;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
