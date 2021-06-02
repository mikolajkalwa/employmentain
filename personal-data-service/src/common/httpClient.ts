import { Injectable } from '@nestjs/common';
import got from 'got';
import { GoRestResponse } from 'src/commands/interfaces/go-rest-response';

@Injectable()
export class HttpClient {
  async getPersonalData(id: number): Promise<GoRestResponse> {
    const response = (await got(
      `https://gorest.co.in/public-api/users/${id}`,
    ).json()) as GoRestResponse;
    return response;
  }
}
