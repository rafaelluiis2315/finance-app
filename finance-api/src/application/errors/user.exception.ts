import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyInUseError extends HttpException {
  constructor(email: string) {
    super(`The e-mail ${email} is already in use`, HttpStatus.BAD_REQUEST);
  }
}
