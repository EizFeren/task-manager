import { Table, Model, Column, DataType } from 'sequelize-typescript';

import { UserRoles } from 'src/user/user.enums';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  name: UserRoles;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accessLevel: number;
}
