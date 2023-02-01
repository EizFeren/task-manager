import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';

import { validateConfig } from 'src/config/validator/config.validator';
import { loadConfig } from 'src/config/loader/config.loader';
import { ConfigDomains } from 'src/config/config.enums';
import { UserModule } from 'src/user/user.module';
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
    SequelizeModule.forRootAsync({
      inject: [
        ConfigService,
      ],
      useFactory(configService: ConfigService): SequelizeModuleOptions {
        return configService.get<SequelizeModuleOptions>(ConfigDomains.db);
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
