import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesignPatternsModule } from './design-patterns/design-patterns.module';

@Module({
  imports: [DesignPatternsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
