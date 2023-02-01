import { JwtModuleOptions } from '@nestjs/jwt';

export interface AuthConfig {
  jwt: JwtModuleOptions;
}
