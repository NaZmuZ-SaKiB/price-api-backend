import { Error } from 'mongoose';
import { TGenericErrorResponse } from '../types/error.type';

const handleMongooseValidationError = (
  err: Error.ValidationError,
): TGenericErrorResponse => {
  const message = Object.values(err.errors)
    .map((val: Error.ValidatorError | Error.CastError) => val?.message)
    .join(', ');

  return {
    statusCode: 403,
    message,
    errorType: 'Validation Error.',
  };
};

export default handleMongooseValidationError;
