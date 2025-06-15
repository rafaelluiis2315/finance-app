import { Inject } from '@nestjs/common';
import { UserNotFoundError } from 'src/application/errors/user.exception';
import { PostgresGetUserBalanceRepository } from 'src/infra/repository/postgres/user/get-user-balance';
import { PostgresGetUserByIdRepository } from 'src/infra/repository/postgres/user/get-user-by-id';

export class GetUserBalanceUseCase {
  constructor(
    @Inject(PostgresGetUserByIdRepository)
    private readonly getUserByIdRepository: PostgresGetUserByIdRepository,
    @Inject(PostgresGetUserBalanceRepository)
    private readonly getUserBalanceRepository: PostgresGetUserBalanceRepository,
  ) {}

  async execute(id: string) {
    const user = await this.getUserByIdRepository.execute(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return await this.getUserBalanceRepository.execute(id);
  }
}
