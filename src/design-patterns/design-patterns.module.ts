import { Module } from '@nestjs/common';
import { DesignPatternsService } from './design-patterns.service';
import { DesignPatternsController } from './design-patterns.controller';
import {
  DiscordNotification,
  EmailNotification,
  NotificationFactory,
  WhatsAppNotification,
} from './classes/notificatios-factory';
import {
  DiscordStrategy,
  EmailStrategy,
  NotificationContext,
  WhatsAppStrategy,
} from './classes/strategy';
import {
  LoggingService,
  NotificationService,
  PrinterService,
} from './classes/observer';

@Module({
  imports: [],
  controllers: [DesignPatternsController],
  providers: [
    DesignPatternsService,
    NotificationFactory,
    WhatsAppNotification,
    EmailNotification,
    DiscordNotification,
    WhatsAppStrategy,
    EmailStrategy,
    DiscordStrategy,
    NotificationContext,
    PrinterService,
    LoggingService,
    NotificationService,
  ],
})
export class DesignPatternsModule {}
