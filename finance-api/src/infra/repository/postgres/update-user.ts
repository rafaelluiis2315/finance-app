import { Inject } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';

interface UpdateUserParams {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export class PostgresUpdateUserRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(userId: string, updateParams: UpdateUserParams) {
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateParams).forEach((params) => {
      updateFields.push(`${params} = $${updateValues.length + 1}`);
      updateValues.push(updateParams[params]);
    });

    updateValues.push(userId);

    const query = `
      UPDATE public.users 
      SET ${updateFields.join(', ')}, updated_at = NOW()
      WHERE id = $${updateFields.length + 1}
      RETURNING *;
    `;

    const updatedUser = await this.postgresClient.exec({
      query: query,
      params: updateValues,
    });

    return updatedUser[0];
  }
}
