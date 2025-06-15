import { HttpException, HttpStatus } from '@nestjs/common';

export class AmountNotCurrencyError extends HttpException {
  constructor() {
    super('Amount must be a valid currency.', HttpStatus.NOT_FOUND);
  }
}

export class TransactionNotFoundError extends HttpException {
  constructor() {
    super('Transaction not found', HttpStatus.NOT_FOUND);
  }
}
