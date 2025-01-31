import { Controller, Get } from '@nestjs/common';
import { DesignPatternsService } from './design-patterns.service';

@Controller('design-patterns')
export class DesignPatternsController {
  constructor(private readonly designPatternsService: DesignPatternsService) {}

  @Get('notification')
  sendNotification() {
    return this.designPatternsService.sendNotification();
  }

  @Get('strategy')
  strategy() {
    return this.designPatternsService.strategy();
  }

  @Get('observer')
  observer() {
    return this.designPatternsService.observer();
  }
}
