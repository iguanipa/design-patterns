import { Injectable } from '@nestjs/common';
import {
  NotificationFactory,
  NotificationType,
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

@Injectable()
export class DesignPatternsService {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    private readonly notificationContext: NotificationContext,
    private readonly whatsappStrategy: WhatsAppStrategy,
    private readonly emailStrategy: EmailStrategy,
    private readonly discordStrategy: DiscordStrategy,
    private readonly printerService: PrinterService,
    private readonly loggingService: LoggingService,
    private readonly notificationService: NotificationService,
  ) {}

  async sendNotification() {
    let service = this.notificationFactory.getService(NotificationType.EMAIL);
    service.send({ message: 'prueba', email: 'ivanguanipa@gmail.com' });
    service = this.notificationFactory.getService(NotificationType.DISCORD);
    service.send({ message: 'prueba', channel: 'canal_discord' });
    service = this.notificationFactory.getService(NotificationType.WHATSAPP);
    service.send({ message: 'prueba', phone: '04123247859' });
  }

  async strategy() {
    this.notificationContext.setStrategy(this.whatsappStrategy);
    this.notificationContext.sendNotification({
      phone: '987987',
      message: '876876',
    });
    this.notificationContext.setStrategy(this.emailStrategy);
    this.notificationContext.sendNotification({
      email: '987987',
      message: '876876',
      subject: 'prueba de email',
    });

    this.notificationContext.setStrategy(this.discordStrategy);
    this.notificationContext.sendNotification({
      channelId: '987987',
      message: '876876',
    });
  }

  async observer() {
    this.printerService.registerObserver(this.loggingService);
    this.printerService.registerObserver(this.notificationService);
    this.printerService.printDocument('documento a imprimir');
  }
}
