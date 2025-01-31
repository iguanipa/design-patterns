export enum NotificationType {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  DISCORD = 'DISCORD',
}

export interface Notification {
  send(params: any): void;
}

// whatsapp.Notification.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsAppNotification implements Notification {
  send(params: { message: string; phone: string }): void {
    console.log(`Enviando WhatsApp: ${params.phone} ${params.message}`);
    // Lógica para enviar un mensaje por WhatsApp
  }
}

@Injectable()
export class EmailNotification implements Notification {
  send(params: { message: string; email: string }): void {
    console.log(`Enviando Email: ${params.email} ${params.message}`);
    // Lógica para enviar un correo electrónico
  }
}

@Injectable()
export class DiscordNotification implements Notification {
  send(params: { message: string; channel: string }): void {
    console.log(
      `Enviando Mensaje a Discord: ${params.channel} ${params.message}`,
    );
    // Lógica para enviar un mensaje a Discord
  }
}

@Injectable()
export class NotificationFactory {
  constructor(
    private readonly whatsappNotification: WhatsAppNotification,
    private readonly emailNotification: EmailNotification,
    private readonly discordNotification: DiscordNotification,
  ) {}

  getService(type: NotificationType): Notification {
    switch (type) {
      case NotificationType.WHATSAPP:
        return this.whatsappNotification;
      case NotificationType.EMAIL:
        return this.emailNotification;
      case NotificationType.DISCORD:
        return this.discordNotification;
      default:
        throw new Error('Tipo de notificación no soportado');
    }
  }
}
