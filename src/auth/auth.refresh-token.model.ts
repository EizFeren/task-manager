import { Table, Model, Column, DataType, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript';

import { User } from 'src/user/user.model';

@Table({
  tableName: 'refreshTokens',
  timestamps: true,
  updatedAt: false,
})
export class RefreshToken extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  createdAt: Date;
}
