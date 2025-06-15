import { Inject, Injectable } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';
import { Transaction } from 'src/model/transaction.entity';

@Injectable()
export class PostgresDeleteTransactionRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(transactionId: string) {
    const deletedTransaction = await this.postgresClient.exec<Transaction>({
      query: `
        DELETE FROM transactions 
        WHERE id = $1 
        RETURNING *
      `,
      params: [transactionId],
    });

    return deletedTransaction[0];
  }
}
