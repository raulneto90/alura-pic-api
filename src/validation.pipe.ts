import {
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

import { ValidationErrors } from './errors/ValidationErrors';

const parsedErrors = (error: ValidationError) => {
  const parsedError = error.constraints
    ? { field: error.property, errors: Object.values(error.constraints) }
    : undefined;

  if (error.children.length === 0) return parsedError;

  const childrenErrors = error.children.map(parsedErrors).flat();

  return parsedError ? [parsedError, ...childrenErrors] : childrenErrors;
};

export class ClassValidatorPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  exceptionFactory = (validationErrors: ValidationError[]) => {
    if (validationErrors.length > 0) {
      const errors = validationErrors.map(parsedErrors).flat();

      throw new ValidationErrors(errors);
    }
  };
}
