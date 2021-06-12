import { Test, TestingModule } from '@nestjs/testing';
import { HttpClient } from '../common/httpClient';
import { CommandsService } from './commands.service';

describe('CommandsService', () => {
  let service: CommandsService;
  let httpClient: HttpClient;
  let brokerServiceMock: { emit: any };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandsService,
        HttpClient,
        {
          provide: 'RABBITMQ_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
    httpClient = module.get<HttpClient>(HttpClient);
    brokerServiceMock = module.get('RABBITMQ_SERVICE');
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

    await service.run({ id: 110 });

    expect(brokerServiceMock.emit).not.toHaveBeenCalled();
  });

  it('should not proceed if http client promise rejects', async () => {
    jest.spyOn(httpClient, 'getPersonalData').mockImplementation(() => {
      return Promise.reject();
    });

    await service.run({ id: 110 });

    expect(brokerServiceMock.emit).not.toHaveBeenCalled();
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
    await service.run({ id: 110 });

    expect(brokerServiceMock.emit).toHaveBeenCalled();
  });

  it('should not throw if httpClient throws an error', async () => {
    jest.spyOn(httpClient, 'getPersonalData').mockImplementation(() => {
      return Promise.reject();
    });

    await expect(service.run({ id: 110 })).resolves.toBeUndefined();
  });
});
