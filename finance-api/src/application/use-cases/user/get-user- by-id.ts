import { Inject } from '@nestjs/common';
import { PostgresGetUserByIdRepository } from 'src/infra/repository/postgres/get-user-by-id';

export class GetUserByIdUseCase {
  constructor(
    @Inject(PostgresGetUserByIdRepository)
    private readonly getUserByIdRepository: PostgresGetUserByIdRepository,
  ) {}

  async execute(id: string) {
    return await this.getUserByIdRepository.execute(id);
  }
}
