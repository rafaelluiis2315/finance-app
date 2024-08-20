import { Module } from '@nestjs/common';
import { PostgresCreateUserRepository } from './postgres/user/create-user';
import { PostgresGetUserByIdRepository } from './postgres/user/get-user-by-id';
import { PostgresGetUserByEmailRepository } from './postgres/user/get-user-by-email';
import { PostgresUpdateUserRepository } from './postgres/user/update-user';
import { PostgresDeleteUserRepository } from './postgres/user/delete-user';

@Module({
  providers: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
  ],
  exports: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
  ],
})
export class RepositoryModule {}
