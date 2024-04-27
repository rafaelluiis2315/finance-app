import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [DbModule, RepositoryModule],
})
export class InfraModule {}
