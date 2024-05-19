import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../use-cases/user/create-user';
import { GetUserByIdUseCase } from '../use-cases/user/get-user-by-id';
import { isUUID } from 'class-validator';
import { UpdateUserUseCase } from '../use-cases/user/update-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserUseCase } from '../use-cases/user/delete-user';

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
    const isIdValid = isUUID(id);
    if (!isIdValid) {
      throw new BadRequestException('The provided id is not valid.');
    }

    const user = await this.getUserById.execute(id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    const isIdValid = isUUID(id);
    if (!isIdValid) {
      throw new BadRequestException('The provided id is not valid.');
    }

    const user = await this.updateUser.execute(id, updateUser);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const isIdValid = isUUID(id);
    if (!isIdValid) {
      throw new BadRequestException('The provided id is not valid.');
    }

    const userDeleted = await this.deleteUser.execute(id);

    if (!userDeleted) throw new NotFoundException('User not found.');

    return userDeleted;
  }
}
