// notification-strategy.interface.ts
import { Injectable } from '@nestjs/common';

export interface NotificationStrategy {
  send(params: any): void;
}

// whatsapp-strategy.ts

@Injectable()
export class WhatsAppStrategy implements NotificationStrategy {
  send(params: { phone: string; message: string }): void {
    const { phone, message } = params;
    console.log(`Enviando WhatsApp al número ${phone}: ${message}`);
    // Lógica para enviar un mensaje por WhatsApp
  }
}

@Injectable()
export class EmailStrategy implements NotificationStrategy {
  send(params: { email: string; subject: string; message: string }): void {
    const { email, subject, message } = params;
    console.log(
      `Enviando Email a ${email} con asunto "${subject}": ${message}`,
    );
    // Lógica para enviar un correo electrónico
  }
}

@Injectable()
export class DiscordStrategy implements NotificationStrategy {
  send(params: { channelId: string; message: string }): void {
    const { channelId, message } = params;
    console.log(
      `Enviando Mensaje al canal de Discord ${channelId}: ${message}`,
    );
    // Lógica para enviar un mensaje a Discord
  }
}

@Injectable()
export class NotificationContext {
  private strategy: NotificationStrategy;

  setStrategy(strategy: NotificationStrategy): void {
    this.strategy = strategy;
  }

  sendNotification(params: any): void {
    if (!this.strategy) {
      throw new Error('Estrategia no definida');
    }
    this.strategy.send(params);
  }
}
