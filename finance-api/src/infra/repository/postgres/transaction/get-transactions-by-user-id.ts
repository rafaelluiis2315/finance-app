import { Inject } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';
import { Transaction } from 'src/model/transaction.entity';

export class PostgresGetTransactionsByUserIdRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(userId: string) {
    const transactions = await this.postgresClient.exec<Transaction>({
      query: `
        SELECT * FROM public.transactions WHERE user_id = $1
      `,
      params: [userId],
    });

    return transactions;
  }
}
