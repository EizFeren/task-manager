import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from 'src/app/app.module';
import { ConfigDomains } from 'src/config/config.enums';
import { AppConfig } from 'src/app/app.config';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const appConfig: AppConfig = configService.get<AppConfig>(ConfigDomains.app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appConfig.port);
}
