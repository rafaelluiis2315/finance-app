import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../use-cases/user/create-user';
import { GetUserByIdUseCase } from '../use-cases/user/get-user-by-id';
import { UpdateUserUseCase } from '../use-cases/user/update-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserUseCase } from '../use-cases/user/delete-user';
import { checkIdIsValid } from '../helpers/user';
import { InvalidIdError, UserNotFoundError } from '../errors/user.exception';
import { GetUserBalanceUseCase } from '../use-cases/user/get-user-balance';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserBalanceUseCase: GetUserBalanceUseCase, // Assuming this is the correct use case for balance retrieval
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    const user = await this.getUserByIdUseCase.execute(id);

    if (!user) throw new UserNotFoundError();

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    const user = await this.updateUserUseCase.execute(id, updateUser);

    if (!user) throw new UserNotFoundError();

    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    const userDeleted = await this.deleteUserUseCase.execute(id);

    if (!userDeleted) throw new UserNotFoundError();

    return userDeleted;
  }

  @Get(':id/balance')
  async getUserBalance(@Param('id') id: string) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    const userBalance = await this.getUserBalanceUseCase.execute(id);

    return userBalance;
  }
}
