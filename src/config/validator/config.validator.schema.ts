import { IsEnum, IsPort, IsNotEmpty } from 'class-validator';

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
}
