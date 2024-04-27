import { Inject, Injectable } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';

interface CreateUserParams {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class PostgresCreateUserRepository {
  constructor(@Inject(Postgres) private readonly postgresClient: Postgres) {}

  async execute(createUserParams: CreateUserParams) {
    await this.postgresClient.exec({
      query: `INSERT INTO public.users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5);`,
      params: [
        createUserParams.id,
        createUserParams.firstName,
        createUserParams.lastName,
        createUserParams.email,
        createUserParams.password,
      ],
    });

    const userCreated = await this.postgresClient.exec({
      query: `SELECT * FROM public.users WHERE id = $1;`,
      params: [createUserParams.id],
    });

    return userCreated[0];
  }
}
