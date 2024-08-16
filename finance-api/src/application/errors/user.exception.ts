import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyInUseError extends HttpException {
  constructor(email: string) {
    super(`The e-mail ${email} is already in use`, HttpStatus.BAD_REQUEST);
  }
}

export class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidIdError extends HttpException {
  constructor() {
    super('The provided id is not valid', HttpStatus.BAD_REQUEST);
  }
}
