import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { ValidatorController } from './validator/validator.controller';
import { ValidatorService } from './validator/validator.service';
import { ValidatorModule } from './validator/validator.module';

@Module({
  imports: [CoinsModule, ValidatorModule],
  controllers: [AppController, ValidatorController],
  providers: [AppService, ValidatorService],
})
export class AppModule {}
