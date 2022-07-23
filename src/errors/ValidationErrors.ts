import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationErrors extends HttpException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public errors: any[]) {
    super(
      {
        message: 'Ocorreu um erro na validação dos dados',
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
