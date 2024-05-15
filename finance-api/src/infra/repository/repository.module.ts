import { Global, Module } from '@nestjs/common';
import { PostgresCreateUserRepository } from './postgres/create-user';
import { PostgresGetUserByIdRepository } from './postgres/get-user-by-id';
import { PostgresGetUserByEmailRepository } from './postgres/get-user-by-email';
import { PostgresUpdateUserRepository } from './postgres/update-user';

@Global()
@Module({
  providers: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
  ],
  exports: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
  ],
})
export class RepositoryModule {}
