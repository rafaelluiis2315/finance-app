import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundError } from 'src/application/errors/user.exception';
import { PostgresGetUserByIdRepository } from 'src/infra/repository/postgres/user/get-user-by-id';
import { PostgresGetTransactionsByUserIdRepository } from 'src/infra/repository/postgres/transaction/get-transactions-by-user-id';

@Injectable()
export class GetTransactionsByUserIdUseCase {
  constructor(
    @Inject(PostgresGetTransactionsByUserIdRepository)
    private readonly getTransactionsByUserId: PostgresGetTransactionsByUserIdRepository,
    @Inject(PostgresGetUserByIdRepository)
    private readonly getUserByIdRepository: PostgresGetUserByIdRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const transactions = this.getTransactionsByUserId.execute(user.id);

    return transactions;
  }
}
