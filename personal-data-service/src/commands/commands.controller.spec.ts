import { Test, TestingModule } from '@nestjs/testing';
import { HttpClient } from '../common/httpClient';
import { MessageBroker } from '../common/messageBroker';
import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';

jest.mock('../common/messageBroker');
jest.mock('../common/httpClient');

describe('CommandsController', () => {
  let controller: CommandsController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandsController],
      providers: [CommandsService, MessageBroker, HttpClient],
    }).compile();

    controller = module.get<CommandsController>(CommandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('run', () => {
    it('should return undefined', async () => {
      const result = controller.run({ id: 110 });
      expect(result).toBeUndefined();
    });
  });
});
