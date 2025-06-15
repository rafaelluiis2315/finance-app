import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './user/create-user';
import { GetUserByIdUseCase } from './user/get-user-by-id';
import { UpdateUserUseCase } from './user/update-user';
import { DeleteUserUseCase } from './user/delete-user';
import { RepositoryModule } from 'src/infra/repository/repository.module';
import { CreateTransactionUseCase } from './transaction/create-transaction';
import { GetTransactionsByUserIdUseCase } from './transaction/get-transactions-by-user-id';
import { UpdateTransactionUseCase } from './transaction/update-transaction';
import { DeleteTransactionUseCase } from './transaction/delete-transaction';
import { GetUserBalanceUseCase } from './user/get-user-balance';

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
    GetUserBalanceUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
    GetUserBalanceUseCase,
  ],
})
export class UseCasesModule {}
