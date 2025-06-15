import { Inject } from '@nestjs/common';
import { PostgresDeleteTransactionRepository } from 'src/infra/repository/postgres/transaction/delete-transaction';

export class DeleteTransactionUseCase {
  constructor(
    @Inject(PostgresDeleteTransactionRepository)
    private readonly deleteTransactionRepository: PostgresDeleteTransactionRepository,
  ) {}

  async execute(transactionId: string) {
    return await this.deleteTransactionRepository.execute(transactionId);
  }
}
