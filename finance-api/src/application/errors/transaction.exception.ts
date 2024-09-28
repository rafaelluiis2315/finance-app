import { HttpException, HttpStatus } from '@nestjs/common';

export class AmountNotCurrencyError extends HttpException {
  constructor() {
    super('Amount must be a valid currency.', HttpStatus.NOT_FOUND);
  }
}
