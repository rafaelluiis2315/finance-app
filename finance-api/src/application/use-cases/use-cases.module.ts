import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './user/create-user';
import { GetUserByIdUseCase } from './user/get-user-by-id';
import { UpdateUserUseCase } from './user/update-user';
import { DeleteUserUseCase } from './user/delete-user';
import { RepositoryModule } from 'src/infra/repository/repository.module';
import { CreateTransactionUseCase } from './transaction/create-transaction';

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateTransactionUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateTransactionUseCase,
  ],
})
export class UseCasesModule {}
