import { Test, TestingModule } from '@nestjs/testing';
import { HttpClient } from '../common/httpClient';
import { MessageBroker } from '../common/messageBroker';
import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';

jest.mock('../common/messageBroker');
describe('CommandsController', () => {
  let controller: CommandsController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandsController],
      providers: [CommandsService, MessageBroker, HttpClient],
    }).compile();

    controller = module.get<CommandsController>(CommandsController);
    httpClient = module.get<HttpClient>(HttpClient);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('run', () => {
    it('should return undefined if 3rd party service returns data', async () => {
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

      const runDto = { id: 110 };

      expect(await controller.run(runDto)).toBeUndefined();
    });

    it("should return undefined if 3rd party service doesn't return data", async () => {
      jest.spyOn(httpClient, 'getPersonalData').mockImplementation(() => {
        return Promise.resolve({
          code: 404,
          meta: null,
          data: {
            message: 'Resource not found',
          },
        });
      });

      const runDto = { id: 110 };

      expect(await controller.run(runDto)).toBeUndefined();
    });
  });
});
