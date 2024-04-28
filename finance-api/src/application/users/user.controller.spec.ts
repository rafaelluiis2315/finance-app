import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { CreateUserUseCase } from '../use-cases/user/create-user';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [CreateUserUseCase],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
