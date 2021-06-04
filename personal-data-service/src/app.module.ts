import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommandsModule } from './commands/commands.module';
import { LoggingInterceptor } from './common/logging.interceptor';

@Module({
  imports: [CommandsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
