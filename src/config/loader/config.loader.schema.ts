import { EnvTypes } from 'src/config/config.enums';
import { AppConfig } from 'src/app/app.config';

export interface ConfigLoaderSchema {
  envType: EnvTypes;
  app: AppConfig;
}
