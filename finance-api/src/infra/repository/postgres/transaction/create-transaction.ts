import { Inject } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';
import { TransactionType } from 'src/model/enum/transaction-type.enum';
import { Transaction } from 'src/model/transaction.entity';

interface CreateTransactionParams {
  id: string;
  userId: string;
  name: string;
  date: Date;
  amount: number;
  type: TransactionType;
}

export class PostgresCreateTransactionRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(createTransactionParams: CreateTransactionParams) {
    const transactionCreated = await this.postgresClient.exec<Transaction>({
      query: `
        INSERT INTO public.transactions (id, user_id, name, date, amount, type) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
      `,
      params: [
        createTransactionParams.id,
        createTransactionParams.userId,
        createTransactionParams.name,
        createTransactionParams.date,
        createTransactionParams.amount,
        createTransactionParams.type,
      ],
    });

    return transactionCreated[0];
  }
}
