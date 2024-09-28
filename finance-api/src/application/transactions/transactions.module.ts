import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { UseCasesModule } from '../use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
