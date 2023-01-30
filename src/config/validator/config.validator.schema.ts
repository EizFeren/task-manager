import { IsEnum, IsPort } from 'class-validator';

import { EnvTypes } from 'src/config/config.enums';

export class ConfigValidatorSchema {
  @IsEnum(EnvTypes)
  NODE_ENV: string;

  @IsPort()
  APP_PORT: string;
}
