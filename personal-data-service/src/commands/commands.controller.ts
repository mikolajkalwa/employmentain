import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CommandsService } from './commands.service';
import { RunDto } from './dto/run.dto';

@Controller('api/v1/commands')
export class CommandsController {
  constructor(private readonly commandService: CommandsService) {}

  @Post('run')
  @HttpCode(HttpStatus.ACCEPTED)
  run(@Body(new ValidationPipe()) runDto: RunDto) {
    this.commandService.run(runDto);
  }
}
