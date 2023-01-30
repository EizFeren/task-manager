import { ConfigModule } from '@nestjs/config';

import { ConfigLoaderSchema } from 'src/config/loader/config.loader.schema';
import { EnvTypes } from 'src/config/config.enums';

export async function loadConfig(): Promise<ConfigLoaderSchema> {
  if (process.env.NODE_ENV !== EnvTypes.production) {
    await ConfigModule.envVariablesLoaded;
  }

  return {
    envType: process.env.NODE_ENV as EnvTypes,
    app: {
      port: parseInt(process.env.APP_PORT),
    },
  };
}
