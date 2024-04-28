import { Global, Module } from '@nestjs/common';
import { CreateUserUseCase } from './user/create-user';
import { GetUserByIdUseCase } from './user/get-user- by-id';

@Global()
@Module({
  providers: [CreateUserUseCase, GetUserByIdUseCase],
  exports: [CreateUserUseCase, GetUserByIdUseCase],
})
export class UseCasesModule {}
