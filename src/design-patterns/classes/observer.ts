import { Injectable } from '@nestjs/common';

export interface Observer {
  update(message: string): void;
}

@Injectable()
export class LoggingService implements Observer {
  update(message: string): void {
    console.log(`[LoggingService] Registro de impresión: ${message}`);
  }
}

@Injectable()
export class NotificationService implements Observer {
  update(message: string): void {
    console.log(`[NotificationService] Notificación enviada: ${message}`);
  }
}

@Injectable()
export class PrinterService {
  private observers: Observer[] = [];

  // Método para registrar observadores
  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  // Método para eliminar observadores
  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Método para notificar a los observadores
  private notifyObservers(message: string): void {
    this.observers.forEach((observer) => observer.update(message));
  }

  // Método para imprimir un documento
  printDocument(document: string): void {
    console.log(`Imprimiendo documento: ${document}`);
    this.notifyObservers(`Se imprimió el documento: ${document}`);
  }
}
