import { plainToInstance } from 'class-transformer';
import { ValidationError, validateSync } from 'class-validator';

import { ConfigValidatorSchema } from 'src/config/validator/config.validator.schema';

export function validateConfig(rawConfig: Record<string, any>): ConfigValidatorSchema {
  const config: ConfigValidatorSchema = plainToInstance(ConfigValidatorSchema, rawConfig);
  const errors: ValidationError[] = validateSync(config, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return config;
}
