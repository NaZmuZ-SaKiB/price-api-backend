import { Error } from 'mongoose';
import { TGenericErrorResponse } from '../types/error.type';

const handleMongooseCastError = (
  err: Error.CastError,
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: err.message,
    errorType: 'Invalid ID.',
  };
};

export default handleMongooseCastError;
