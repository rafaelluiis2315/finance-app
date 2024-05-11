import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
// import { CustomError } from '../errors/custom-error.exception';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message =
      typeof exception.getResponse() === 'object'
        ? exception.getResponse()['message']
        : exception.getResponse();

    response.status(status).json({
      message,
    });
  }
}
