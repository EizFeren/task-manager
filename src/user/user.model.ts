import { Table, Model, Column, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

import { UserRoles } from 'src/user/user.enums';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: UserRoles.user,
  })
  role: UserRoles;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  confirmed: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  blocked: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
