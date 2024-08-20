import { Inject } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';

export class PostgresGetUserByEmailRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(email: string) {
    const user = await this.postgresClient.exec({
      query: `SELECT * FROM public.users WHERE email = $1;`,
      params: [email],
    });

    return user[0];
  }
}
