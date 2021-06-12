import { Inject, Injectable, Logger } from '@nestjs/common';
import { RunDto } from './dto/run.dto';
import { transformPersonalData } from '../common/transform';

import { HttpClient } from '../common/httpClient';
import { PersonalData } from './models/personal-data';
import got from 'got/dist/source';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  constructor(
    private readonly httpClient: HttpClient,
    @Inject('RABBITMQ_SERVICE') private readonly brokerService: ClientProxy,
  ) {}

  async run(runDto: RunDto): Promise<void> {
    try {
      const personalDataServiceResponse = await this.httpClient.getPersonalData(
        runDto.id,
      );

      if (personalDataServiceResponse.code !== 200) {
        this.logger.warn(
          `Third party service returned non 200 response code.
          Response: ${JSON.stringify(personalDataServiceResponse)}`,
        );
        return;
      }

      const transformedData = transformPersonalData(
        personalDataServiceResponse.data as PersonalData,
      );

      this.logger.log(
        `Transformed ${JSON.stringify(
          personalDataServiceResponse.data,
        )} into ${JSON.stringify(transformedData)}`,
      );

      this.brokerService.emit('user', JSON.stringify(transformedData));
    } catch (err) {
      if (err instanceof got.RequestError) {
        this.logger.error(
          `Access to 3rd party service failed: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error('Unknown error occured', JSON.stringify(err));
      }
    }
  }
}
