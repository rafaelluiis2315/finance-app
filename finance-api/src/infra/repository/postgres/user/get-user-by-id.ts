import { Inject } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';
import { User } from 'src/model/user.entity';

export class PostgresGetUserByIdRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(userId: string) {
    const user = await this.postgresClient.exec<User>({
      query: `SELECT * FROM public.users WHERE id = $1;`,
      params: [userId],
    });

    return user[0];
  }
}
