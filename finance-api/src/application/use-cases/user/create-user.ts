import { Inject, Injectable } from '@nestjs/common';
import { PostgresCreateUserRepository } from 'src/infra/repository/postgres/create-user';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PostgresGetUserByEmailRepository } from 'src/infra/repository/postgres/get-user-by-email';

interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(PostgresCreateUserRepository)
    private readonly createUserRepository: PostgresCreateUserRepository,
    @Inject(PostgresGetUserByEmailRepository)
    private readonly getUserByEmailRepository: PostgresGetUserByEmailRepository,
  ) {}
  async execute(createUser: CreateUserParams) {
    const userWhithProvidedEmail = await this.getUserByEmailRepository.execute(
      createUser.email,
    );

    if (userWhithProvidedEmail) {
      throw new Error('The provided email is already in use.');
    }

    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    const results = await this.createUserRepository.execute({
      ...createUser,
      id: userId,
      password: hashedPassword,
    });

    return results;
  }
}
