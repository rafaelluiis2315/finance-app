import { Test, TestingModule } from '@nestjs/testing';
import { Postgres } from './create-user';

describe('Postgres', () => {
  let provider: Postgres;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Postgres],
    }).compile();

    provider = module.get<Postgres>(Postgres);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
