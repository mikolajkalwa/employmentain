import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { HttpClient } from '../common/httpClient';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'RABBITMQ_SERVICE',
      useFactory: (configService: ConfigService) => {
        const amqp = configService.get<string>('AMQP');
        const queue = configService.get<string>('QUEUE');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [amqp],
            queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    CommandsService,
    HttpClient,
  ],
  controllers: [CommandsController],
})
export class CommandsModule {}
