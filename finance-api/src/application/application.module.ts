import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/user/create-user';

@Module({
  providers: [CreateUserUseCase],
})
export class ApplicationModule {}
