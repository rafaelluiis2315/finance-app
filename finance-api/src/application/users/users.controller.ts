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

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUser.execute(createUserDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    const user = await this.getUserById.execute(id);

    if (!user) throw new UserNotFoundError();

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    const user = await this.updateUser.execute(id, updateUser);

    if (!user) throw new UserNotFoundError();

    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    const userDeleted = await this.deleteUser.execute(id);

    if (!userDeleted) throw new UserNotFoundError();

    return userDeleted;
  }
}
