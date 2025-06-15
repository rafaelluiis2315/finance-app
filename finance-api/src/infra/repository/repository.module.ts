import { Module } from '@nestjs/common';
import { PostgresCreateUserRepository } from './postgres/user/create-user';
import { PostgresGetUserByIdRepository } from './postgres/user/get-user-by-id';
import { PostgresGetUserByEmailRepository } from './postgres/user/get-user-by-email';
import { PostgresUpdateUserRepository } from './postgres/user/update-user';
import { PostgresDeleteUserRepository } from './postgres/user/delete-user';
import { PostgresCreateTransactionRepository } from './postgres/transaction/create-transaction';
import { PostgresGetTransactionsByUserIdRepository } from './postgres/transaction/get-transactions-by-user-id';
import { PostgresUpdateTransactionRepository } from './postgres/transaction/update-transaction';

@Module({
  providers: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresUpdateTransactionRepository,
  ],
  exports: [
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresUpdateTransactionRepository,
  ],
})
export class RepositoryModule {}
