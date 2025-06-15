import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { isCurrency } from 'class-validator';
import { AmountNotCurrencyError } from '../errors/transaction.exception';
import { InvalidIdError } from '../errors/user.exception';
import { checkIdIsValid } from '../helpers/user';
import { CreateTransactionUseCase } from '../use-cases/transaction/create-transaction';
import { GetTransactionsByUserIdUseCase } from '../use-cases/transaction/get-transactions-by-user-id';
import { UpdateTransactionUseCase } from '../use-cases/transaction/update-transaction';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(CreateTransactionUseCase)
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    @Inject(GetTransactionsByUserIdUseCase)
    private readonly getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase,
    @Inject(UpdateTransactionUseCase)
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    if (!checkIdIsValid(createTransactionDto.userId)) {
      throw new InvalidIdError();
    }

    const isAmountCurrency = isCurrency(
      createTransactionDto.amount.toFixed(2),
      {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
      },
    );

    if (!isAmountCurrency) {
      throw new AmountNotCurrencyError();
    }

    return this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get()
  async getTransactionsByUser(@Query('userId') userId: string) {
    if (!checkIdIsValid(userId)) {
      throw new InvalidIdError();
    }

    return this.getTransactionsByUserIdUseCase.execute(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransaction: UpdateTransactionDto,
  ) {
    if (!checkIdIsValid(id)) {
      throw new InvalidIdError();
    }

    if (!updateTransaction || Object.keys(updateTransaction).length === 0) {
      throw new HttpException('Update data is required', 400);
    }

    const transaction = await this.updateTransactionUseCase.execute({
      id,
      ...updateTransaction,
    });

    return transaction;
  }
}
