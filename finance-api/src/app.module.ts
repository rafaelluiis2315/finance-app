import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [ConfigModule.forRoot(), InfraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
