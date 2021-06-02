import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { HttpClient } from 'src/common/httpClient';
import { MessageBroker } from 'src/common/messageBroker';

@Module({
  providers: [CommandsService, HttpClient, MessageBroker],
  controllers: [CommandsController],
})
export class CommandsModule {}
