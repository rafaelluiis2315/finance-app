import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UseCasesModule } from '../use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [UserController],
})
export class UsersModule {}
