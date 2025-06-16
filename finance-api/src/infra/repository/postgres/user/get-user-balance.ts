import { Inject, Injectable } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';

interface UserBalance {
  userId: string;
  earnings: number;
  expenses: number;
  investments: number;
  balance: number;
}

@Injectable()
export class PostgresGetUserBalanceRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(userId: string) {
    const result = await this.postgresClient.exec<UserBalance>({
      query: `
       SELECT * FROM get_user_balance($1);
      `,
      params: [userId],
    });

    return {
      userId,
      ...result[0],
    };
  }
}
