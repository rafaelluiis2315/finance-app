import { Global, Module } from '@nestjs/common';
import { CreateUserUseCase } from './user/create-user';
import { GetUserByIdUseCase } from './user/get-user- by-id';
import { UpdateUserUseCase } from './user/update-user';

@Global()
@Module({
  providers: [CreateUserUseCase, GetUserByIdUseCase, UpdateUserUseCase],
  exports: [CreateUserUseCase, GetUserByIdUseCase, UpdateUserUseCase],
})
export class UseCasesModule {}
