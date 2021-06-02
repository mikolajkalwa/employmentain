import { Injectable } from '@nestjs/common';
import got from 'got';
import { GoRestResponse } from 'src/commands/interfaces/go-rest-response';
import { PersonalData } from 'src/commands/interfaces/personal-data';

@Injectable()
export class HttpClient {
  async getPersonalData(id: number): Promise<PersonalData> {
    const body = await got(`https://gorest.co.in/public-api/users/${id}`).json() as GoRestResponse;
    return body.data
  }
}