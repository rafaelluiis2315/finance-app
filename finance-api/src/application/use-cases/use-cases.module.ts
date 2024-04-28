import { Global, Module } from '@nestjs/common';
import { CreateUserUseCase } from './user/create-user';

@Global()
@Module({
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class UseCasesModule {}
