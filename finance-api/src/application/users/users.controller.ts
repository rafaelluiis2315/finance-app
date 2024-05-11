import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../use-cases/user/create-user';
import { GetUserByIdUseCase } from '../use-cases/user/get-user- by-id';
import { isUUID } from 'class-validator';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUserById: GetUserByIdUseCase,
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
    return await this.getUserById.execute(id);
  }
}
