import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'app-lib';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule.forRootAsync(AuthModule, {
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('accessTokenJwtSecret'),
        expiresIn: configService.get('accessTokenExpiresIn'),
      }),
      imports: [AppModule],
      inject: [ConfigService]
      // works but opted to useFactory is the one way to inject services like config service
      // useExisting: {
      //   value: {
      //     createModuleConfig: () => {
      //       return {
      //         secret: '90dcfcd8-d3bd-4af0-a8a3-f3e03181a83f',
      //         expiresIn: '120s',
      //       }
      //     }
      //   },
      // },
      // no need for this module already export's it
      // exports: [AuthService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_SERVICE',
      useClass: AppService,
      // useValue: 'VALUE_FROM_APP_SERVICE'
    }
  ],
  // at last so kind of clue, this is waht will solve the problem of 
  // ERROR [ExceptionHandler] Nest can't resolve dependencies of the AuthService (AUTH_MODULE_OPTIONS, ?). Please make sure that the argument APP_SERVICE at index [1] is available in the AuthModule context.
  // now we can import it with `imports: [AppModule]` into AuthModule, and expose it's providers
  // this wat we use it inside it with `@Inject('APP_SERVICE')`
  exports: [
    {
      provide: 'APP_SERVICE',
      useClass: AppService,
      // always test with a value first
      // useValue: 'VALUE_FROM_APP_SERVICE'
    }
  ]
})

export class AppModule { }
