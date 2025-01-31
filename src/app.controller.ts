import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { promisify } from 'util';
import * as sharp from 'sharp';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async getImage() {
    try {
      // Ruta al archivo que contiene los datos varbinary
      const filePath = `info_campo.txt`;

      // Leer los datos del archivo
      const imageData = readFileSync(filePath);

      // Crear un archivo temporal
      const tempFilePath = `${Date.now()}.tmp`;
      const writeStream = createWriteStream(tempFilePath);
      writeStream.write(imageData);
      await promisify(writeStream.end).bind(writeStream)();

      const metadata = await sharp(tempFilePath).metadata();
      console.log(metadata);
      console.log('Formato de imagen:', metadata.format);

      // Enviar una respuesta indicando que la imagen se ha creado correctamente
    } catch (error) {
      console.error('Error al crear la imagen:', error);
    }
  }
}
