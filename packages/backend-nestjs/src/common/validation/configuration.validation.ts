import { plainToClass } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';

// TODO: currently this is not stable in nest, waiting for fix

export class EnvironmentVariables {
  @IsString()
  logger: string;
  @IsNumber()
  httpsServerPort: number;
  @IsString()
  httpsKeyFile: string;
  @IsString()
  httpsCertFile: string;
  @IsString()
  refreshTokenSkipIncrementVersion: string;
  @IsBoolean()
  corsOriginEnabled: boolean;
  @IsString()
  corsOriginReactFrontend: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    enableDebugMessages: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}