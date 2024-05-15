import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PostgresGetUserByEmailRepository } from 'src/infra/repository/postgres/get-user-by-email';
import { EmailAlreadyInUseError } from 'src/application/errors/user.exception';
import { PostgresUpdateUserRepository } from 'src/infra/repository/postgres/update-user';

interface UpdateUserParams {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(PostgresUpdateUserRepository)
    private readonly updateUserRepository: PostgresUpdateUserRepository,
    @Inject(PostgresGetUserByEmailRepository)
    private readonly getUserByEmailRepository: PostgresGetUserByEmailRepository,
  ) {}
  async execute(userId: string, updateUser: UpdateUserParams) {
    if (updateUser.email) {
      const userWhithProvidedEmail =
        await this.getUserByEmailRepository.execute(updateUser.email);

      if (userWhithProvidedEmail && userWhithProvidedEmail.id !== userId) {
        throw new EmailAlreadyInUseError(updateUser.email);
      }
    }

    const user = { ...updateUser };

    if (updateUser.password) {
      const hashedPassword = await bcrypt.hash(updateUser.password, 10);
      user.password = hashedPassword;
    }

    const results = await this.updateUserRepository.execute(userId, user);

    return results;
  }
}
