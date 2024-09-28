import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { checkIdIsValid } from '../helpers/user';
import { InvalidIdError } from '../errors/user.exception';
import { CreateTransactionUseCase } from '../use-cases/transaction/create-transaction';
import { isCurrency } from 'class-validator';
import { AmountNotCurrencyError } from '../errors/transaction.exception';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(CreateTransactionUseCase)
    private readonly createTransactionUseCase: CreateTransactionUseCase,
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
}
