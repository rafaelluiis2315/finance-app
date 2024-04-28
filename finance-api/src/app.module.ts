import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infra/infra.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigModule.forRoot(), InfraModule, ApplicationModule],
})
export class AppModule {}
