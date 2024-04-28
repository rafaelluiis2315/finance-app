import { Global, Module } from '@nestjs/common';
import { PostgresCreateUserRepository } from './postgres/create-user';
import { PostgresGetUserByIdRepository } from './postgres/get-user-by-id';

@Global()
@Module({
  providers: [PostgresCreateUserRepository, PostgresGetUserByIdRepository],
  exports: [PostgresCreateUserRepository, PostgresGetUserByIdRepository],
})
export class RepositoryModule {}
