import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ValidationErrors } from './errors/ValidationErrors';

@Catch()
export class AppExceptionFilters implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      if (exception instanceof ValidationErrors) {
        const exceptionResponse = exception.getResponse();
        return response.status(status).json(exceptionResponse);
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      console.log({ message: exception.message, stack: exception.stack });
    }

    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      process.env.NODE_ENV === 'development'
    ) {
      return response
        .stack(status)
        .json({ message: exception.message, stack: exception.stack });
    }

    return response.status(status).json({
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Internal Server Error'
          : exception.message,
    });
  }
}
