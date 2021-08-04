/**
 *  If you're building a standalone npm package hosting a dynamic module, you
 *  should delete this file.  Its only purpose is to bootstrap the app so that
 *  you can run the quick verification test (see nest-graphql-auth-client/nest-graphql-auth-client.module.ts)
 */
import { NestFactory } from '@nestjs/core';
import { AuthClientModule } from './nest-graphql-auth-client/auth-client.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthClientModule);
  await app.listen(3000);
}
bootstrap();
