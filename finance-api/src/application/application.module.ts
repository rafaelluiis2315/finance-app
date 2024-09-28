import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UseCasesModule } from './use-cases/use-cases.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, UseCasesModule, TransactionsModule],
})
export class ApplicationModule {}
