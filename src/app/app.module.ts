import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateConfig } from 'src/config/validator/config.validator';
import { loadConfig } from 'src/config/loader/config.loader';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
      load: [
        loadConfig,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
