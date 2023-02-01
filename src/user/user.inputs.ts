import { UserRoles } from 'src/user/user.enums';

export interface CreateUserInput {
  name: string;
  password?: string;
}

export interface FindUserInput {
  name: string;
}

export interface EditUserInput {
  name?: string;
  password?: string;
  roleName?: UserRoles;
  confirmed?: boolean;
  blocked?: boolean;
}
