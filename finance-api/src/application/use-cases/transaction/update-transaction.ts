import { Inject, Injectable } from '@nestjs/common';
import { PostgresUpdateTransactionRepository } from 'src/infra/repository/postgres/transaction/update-transaction';
import { Transaction } from 'src/model/transaction.entity';

interface UpdateTransactionParams
  extends Partial<Omit<Transaction, 'createdAt' | 'updatedAt' | 'userId'>> {}

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    @Inject(PostgresUpdateTransactionRepository)
    private readonly updateTransactionRepository: PostgresUpdateTransactionRepository,
  ) {}

  async execute(updateTransaction: UpdateTransactionParams) {
    const transaction = this.updateTransactionRepository.execute({
      ...updateTransaction,
    });

    return transaction;
  }
}
