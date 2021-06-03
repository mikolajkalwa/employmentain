import { Test, TestingModule } from '@nestjs/testing';
import { HttpClient } from '../common/httpClient';
import { MessageBroker } from '../common/messageBroker';
import { CommandsService } from './commands.service';

jest.mock('../common/messageBroker');

describe('CommandsService', () => {
  let service: CommandsService;
  let messageBroker: MessageBroker;
  let httpClient: HttpClient;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandsService, MessageBroker, HttpClient],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
    messageBroker = module.get<MessageBroker>(MessageBroker);
    httpClient = module.get<HttpClient>(HttpClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should not proceed if third party service doesn't return user data", async () => {
    jest.spyOn(httpClient, 'getPersonalData').mockImplementation(() => {
      return Promise.resolve({
        code: 404,
        meta: null,
        data: {
          message: 'Resource not found',
        },
      });
    });
    const messageBrokerSpy = jest.spyOn(messageBroker, 'putOnQueue');

    await service.run({ id: 110 });

    expect(messageBrokerSpy.mock.calls.length).toBe(0);
  });

  it('should proceed if third party service returns user data', async () => {
    jest.spyOn(httpClient, 'getPersonalData').mockImplementation(() => {
      return Promise.resolve({
        code: 200,
        meta: null,
        data: {
          id: 110,
          name: 'Dulari Sinha',
          email: 'dulari_sinha@gislason-heathcote.info',
          gender: 'Female',
          status: 'Inactive',
          created_at: '2021-06-03T03:50:05.104+05:30',
          updated_at: '2021-06-03T03:50:05.104+05:30',
        },
      });
    });
    const messageBrokerSpy = jest.spyOn(messageBroker, 'putOnQueue');
    await service.run({ id: 110 });

    expect(messageBrokerSpy.mock.calls.length).toBe(1);
  });
});
