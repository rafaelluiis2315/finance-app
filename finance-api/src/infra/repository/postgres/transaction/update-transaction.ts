import { Inject } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';
import { Transaction } from 'src/model/transaction.entity';

interface UpdateTransactionParams
  extends Partial<Omit<Transaction, 'createdAt' | 'updatedAt' | 'userId'>> {}

export class PostgresUpdateTransactionRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute({ id, ...updateTransactionParams }: UpdateTransactionParams) {
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateTransactionParams).forEach((params) => {
      updateFields.push(`${params} = $${updateValues.length + 1}`);
      updateValues.push(updateTransactionParams[params]);
    });

    updateValues.push(id);

    const query = `
         UPDATE public.transactions 
         SET ${updateFields.join(', ')}, updated_at = NOW()
         WHERE id = $${updateFields.length + 1}
         RETURNING *;
       `;

    const updatedUser = await this.postgresClient.exec<Transaction>({
      query: query,
      params: updateValues,
    });

    return updatedUser[0];
  }
}
