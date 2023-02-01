import { Table, Model, Column, DataType, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { plainToInstance } from 'class-transformer';

import { UserRoles } from 'src/user/user.enums';
import { RefreshToken } from 'src/auth/auth.refresh-token.model';
import { UserOutput } from 'src/user/user.outputs';

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

  @HasMany(() => RefreshToken, 'userId')
  refreshTokens: RefreshToken[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  serialize(): UserOutput {
    const plainUser = this.get({
      plain: true,
    });

    return plainToInstance(UserOutput, plainUser, {
      excludeExtraneousValues: true,
    });
  }
}
