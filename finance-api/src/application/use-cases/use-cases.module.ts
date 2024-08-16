import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './user/create-user';
import { GetUserByIdUseCase } from './user/get-user-by-id';
import { UpdateUserUseCase } from './user/update-user';
import { DeleteUserUseCase } from './user/delete-user';
import { RepositoryModule } from 'src/infra/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UseCasesModule {}
