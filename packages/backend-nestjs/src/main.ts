import { httpsOptions } from './common/config/express.config';
import { envVariables as e } from './common/config/env.config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  // Logger.log(`process.env.APOLLO_FETCH_POLICY:${process.env.APOLLO_FETCH_POLICY}`);
  const app = await NestFactory.create(
    ApplicationModule, {
    httpsOptions,
    logger: ['error', 'warn'],
  });
  // rest server cors, before any middleware,
  // warn cors for graphql is configured in ApplicationModule
  app.enableCors({
    origin: e.corsOriginReactFrontend,
    credentials: true,
  });
  // middleware
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(e.httpsPort)
    .then(() => {
      Logger.log(`graphql server started, endpoint exposed at https://localhost:${e.httpsPort}/graphql`);
      Logger.log(`corsOrigin authorized domains '${e.corsOriginReactFrontend.join(', ')}'`);
    });
}

bootstrap();
