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
    db: {
      autoLoadModels: true,
      synchronize: false,
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    auth: {
      jwt: {
        secret: process.env.AUTH_JWT_SECRET,
        signOptions: {
          expiresIn: parseInt(process.env.AUTH_JWT_EXPIRES_IN),
        },
        verifyOptions: {
          maxAge: parseInt(process.env.AUTH_JWT_EXPIRES_IN),
        },
      },
    },
  };
}
