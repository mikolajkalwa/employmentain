import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { HttpClient } from 'src/common/httpClient';

@Module({
  providers: [CommandsService, HttpClient],
  controllers: [CommandsController],
})
export class CommandsModule {}
