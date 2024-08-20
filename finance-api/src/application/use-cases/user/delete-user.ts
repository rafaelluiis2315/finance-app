import { Inject } from '@nestjs/common';
import { PostgresDeleteUserRepository } from 'src/infra/repository/postgres/user/delete-user';

export class DeleteUserUseCase {
  constructor(
    @Inject(PostgresDeleteUserRepository)
    private readonly deleteUserRepository: PostgresDeleteUserRepository,
  ) {}

  async execute(userId: string) {
    return await this.deleteUserRepository.execute(userId);
  }
}
