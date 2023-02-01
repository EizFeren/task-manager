import { IsEnum, IsPort, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

import { EnvTypes } from 'src/config/config.enums';

export class ConfigValidatorSchema {
  @IsEnum(EnvTypes)
  NODE_ENV: string;

  @IsPort()
  APP_PORT: string;

  @IsNotEmpty()
  DB_HOST: string;

  @IsPort()
  DB_PORT: string;

  @IsNotEmpty()
  DB_USER: string;

  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsNotEmpty()
  DB_DATABASE: string;

  @IsNotEmpty()
  AUTH_JWT_SECRET: string;

  @Type(() => Number)
  @Min(60 * 60) // 1 hour
  @Max(24 * 60 * 60) // 1 day
  AUTH_JWT_EXPIRES_IN: number;
}
