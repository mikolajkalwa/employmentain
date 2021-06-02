import { Injectable, Logger } from '@nestjs/common';
import { RunDto } from './dto/run.dto';
import { transformPersonalData } from '../common/transform';
import { connect } from 'amqplib'
import { HttpClient } from 'src/common/httpClient';

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  constructor(private readonly httpClient: HttpClient) { }

  async run(runDto: RunDto): Promise<void> {
    const personalData = await this.httpClient.getPersonalData(runDto.id)
    const transformedData = transformPersonalData(personalData)
    const connection = await connect(process.env.AMQP)
    const channel = await connection.createChannel()
    channel.sendToQueue(process.env.QUEUE, Buffer.from(JSON.stringify(transformedData)))

    this.logger.log(JSON.stringify(transformedData))
  }
}
