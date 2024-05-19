import { Inject } from '@nestjs/common';
import { PostgresDeleteUserRepository } from 'src/infra/repository/postgres/delete-user';

export class DeleteUserUseCase {
  constructor(
    @Inject(PostgresDeleteUserRepository)
    private readonly deleteUserRepository: PostgresDeleteUserRepository,
  ) {}

  async execute(userId) {
    return await this.deleteUserRepository.execute(userId);
  }
}
