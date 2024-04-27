import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user';

describe('CreateUserUseCase ', () => {
  let provider: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserUseCase],
    }).compile();

    provider = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
