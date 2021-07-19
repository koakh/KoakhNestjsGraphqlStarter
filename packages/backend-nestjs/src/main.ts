import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { httpsConfig, loggerConfig } from './common/config';

async function bootstrap() {
  const context = 'NestApplication';
  const app = await NestFactory.create(
    ApplicationModule, {
    httpsOptions: httpsConfig,
    logger: loggerConfig,
  });
  const configService = app.get<ConfigService>(ConfigService);
  const httpsServerPort = configService.get<string>('httpsServerPort');
  const httpsKeyFile = configService.get<string>('httpsKeyFile');
  const httpsCertFile = configService.get<string>('httpsCertFile');
  const corsOriginEnabled = configService.get<boolean>('corsOriginEnabled');
  const corsOriginReactFrontend = configService.get<string>('corsOriginReactFrontend');
  let corsOptions: { origin?: string[], credentials: boolean } = { credentials: true };
  let corsMessage = 'disabled';
  // inject origin if corsOriginEnabled
  if (corsOriginEnabled === true) {
    corsOptions = { ...corsOptions, origin: corsOriginReactFrontend.split(',').map((e) => e.trim()) };
    corsMessage = `authorized domains: '${corsOriginReactFrontend}'`;
  };
  // rest server cors, before any middleware,
  // warn cors for graphql is configured in ApplicationModule
  app.enableCors({
    origin: corsOriginReactFrontend,
    credentials: true,
  });
  // middleware
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(httpsServerPort)
    .then(() => {
      Logger.log(`graphql server started, endpoint exposed at https://localhost:${httpsServerPort}/graphql`, context);
      Logger.log(`  server certificates: '${httpsKeyFile}, ${httpsCertFile}'`, context);
      Logger.log(`  corsOrigin ${corsMessage}`, context);
    });
}

bootstrap();
