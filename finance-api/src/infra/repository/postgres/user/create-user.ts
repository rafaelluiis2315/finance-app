import { Inject, Injectable } from '@nestjs/common';
import { Postgres } from 'src/infra/db/postgres/postgres';
import { User } from 'src/model/user.entity';

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
    const userCreated = await this.postgresClient.exec<User>({
      query: `
        INSERT INTO public.users (id, first_name, last_name, email, password) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      params: [
        createUserParams.id,
        createUserParams.firstName,
        createUserParams.lastName,
        createUserParams.email,
        createUserParams.password,
      ],
    });

    return userCreated[0];
  }
}
