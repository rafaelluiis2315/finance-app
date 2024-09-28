import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from 'src/application/errors/user.exception';
import { PostgresGetUserByIdRepository } from 'src/infra/repository/postgres/user/get-user-by-id';
import { PostgresCreateTransactionRepository } from 'src/infra/repository/postgres/transaction/create-transaction';
import { Transaction } from 'src/model/transaction.entity';

interface CreateTransactionParams
  extends Omit<Transaction, 'createdAt' | 'updatedAt' | 'id'> {}

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(PostgresCreateTransactionRepository)
    private readonly createTransactionRepository: PostgresCreateTransactionRepository,
    @Inject(PostgresGetUserByIdRepository)
    private readonly getUserByIdRepository: PostgresGetUserByIdRepository,
  ) {}

  async execute(createTransaction: CreateTransactionParams) {
    const user = await this.getUserByIdRepository.execute(
      createTransaction.userId,
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    const transactionId = uuidv4();

    const transaction = this.createTransactionRepository.execute({
      ...createTransaction,
      id: transactionId,
    });

    return transaction;
  }
}
