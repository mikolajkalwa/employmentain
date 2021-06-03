import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { HttpClient } from '../common/httpClient';
import { MessageBroker } from '../common/messageBroker';

@Module({
  providers: [CommandsService, HttpClient, MessageBroker],
  controllers: [CommandsController],
})
export class CommandsModule {}
