import { Injectable, Logger } from '@nestjs/common';
import { RunDto } from './dto/run.dto';
import { transformPersonalData } from '../common/transform';

import { HttpClient } from 'src/common/httpClient';
import { MessageBroker } from 'src/common/messageBroker';

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly messageBroker: MessageBroker,
  ) {}

  async run(runDto: RunDto): Promise<void> {
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
      personalDataServiceResponse.data,
    );

    await this.messageBroker.putOnQueue(JSON.stringify(transformedData));
    this.logger.log(JSON.stringify(transformedData));
  }
}
