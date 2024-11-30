import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './user/create-user';
import { GetUserByIdUseCase } from './user/get-user-by-id';
import { UpdateUserUseCase } from './user/update-user';
import { DeleteUserUseCase } from './user/delete-user';
import { RepositoryModule } from 'src/infra/repository/repository.module';
import { CreateTransactionUseCase } from './transaction/create-transaction';
import { GetTransactionsByUserIdUseCase } from './transaction/get-transactions-by-user-id';

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
  ],
})
export class UseCasesModule {}
