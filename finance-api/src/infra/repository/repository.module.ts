import { Global, Module } from '@nestjs/common';
import { PostgresCreateUserRepository } from './postgres/create-user';

@Global()
@Module({
  providers: [PostgresCreateUserRepository],
  exports: [PostgresCreateUserRepository],
})
export class RepositoryModule {}
