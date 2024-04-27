import { Inject, Injectable } from '@nestjs/common';
import { PostgresCreateUserRepository } from 'src/infra/repository/postgres/create-user';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

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
  ) {}
  async execute(createUser: CreateUserParams) {
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
