import { httpsOptions } from './common/config/express.config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const context = 'NestApplication';
  const app = await NestFactory.create(
    ApplicationModule, {
    httpsOptions,
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get<ConfigService>(ConfigService);
  const httpsServerPort = configService.get<string>('server.httpsServerPort');
  const httpsKeyFile = configService.get<string>('server.httpsKeyFile');
  const httpsCertFile = configService.get<string>('server.httpsCertFile');
  const corsOriginEnabled = configService.get<boolean>('server.corsOriginEnabled');
  const corsOriginReactFrontend = configService.get<string>('server.corsOriginReactFrontend');
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
