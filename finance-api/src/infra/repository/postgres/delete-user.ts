import { Inject, Injectable } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';

@Injectable()
export class PostgresDeleteUserRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(userId: string) {
    const deletedUser = await this.postgresClient.exec({
      query: `
        DELETE FROM users 
        WHERE id = $1 
        RETURNING *
        `,
      params: [userId],
    });

    return deletedUser[0];
  }
}
