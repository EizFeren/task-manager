import { UserRoles } from 'src/user/user.enums';

export function getRoleAccessLevel(role: UserRoles): number {
  return Object.keys(UserRoles).indexOf(role);
}
