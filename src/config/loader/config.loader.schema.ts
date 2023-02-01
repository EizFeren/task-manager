import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { EnvTypes } from 'src/config/config.enums';
import { AppConfig } from 'src/app/app.config';
import { AuthConfig } from 'src/auth/auth.config';

export interface ConfigLoaderSchema {
  envType: EnvTypes;
  app: AppConfig;
  db: SequelizeModuleOptions;
  auth: AuthConfig;
}
