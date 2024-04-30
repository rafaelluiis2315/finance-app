import { Global, Module } from '@nestjs/common';
import { PostgresCreateUserRepository } from './postgres/create-user';
import { PostgresGetUserByIdRepository } from './postgres/get-user-by-id';
import { PostgresGetUserByEmailRepository } from './postgres/get-user-by-email';

@Global()
@Module({
  providers: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
  ],
  exports: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
  ],
})
export class RepositoryModule {}
