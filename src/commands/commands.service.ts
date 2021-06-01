import { Injectable, Logger } from '@nestjs/common';
import got from 'got';
import { RunDto } from './dto/run.dto';
import { GoRestResponse } from './interfaces/go-rest-response';
import { transformPersonalData } from './common/transform';
import {connect} from 'amqplib'

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  async run(runDto: RunDto): Promise<void> {
    const body = await got(`https://gorest.co.in/public-api/users/${runDto.id}`).json() as GoRestResponse;
    const transformedData = transformPersonalData(body.data)
    const connection = await connect(process.env.AMQP)
    const channel = await connection.createChannel()
    channel.sendToQueue(process.env.QUEUE, Buffer.from(JSON.stringify(transformedData)))

    this.logger.log(JSON.stringify(transformedData))
  }
}
