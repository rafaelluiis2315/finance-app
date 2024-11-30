import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { isCurrency } from 'class-validator';
import { AmountNotCurrencyError } from '../errors/transaction.exception';
import { InvalidIdError } from '../errors/user.exception';
import { checkIdIsValid } from '../helpers/user';
import { CreateTransactionUseCase } from '../use-cases/transaction/create-transaction';
import { GetTransactionsByUserIdUseCase } from '../use-cases/transaction/get-transactions-by-user-id';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(CreateTransactionUseCase)
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    @Inject(GetTransactionsByUserIdUseCase)
    private readonly getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase,
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
}
