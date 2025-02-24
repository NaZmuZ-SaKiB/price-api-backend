import httpStatus from 'http-status';
import { TGenericErrorResponse } from '../types/error.type';

const handleDuplicateKeyError = (err: any): TGenericErrorResponse => {
  const message = `${Object.keys(err.keyValue)[0]} ( ${
    Object.values(err.keyValue)[0]
  } ) already exists.`;

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message,
    errorType: 'Duplicate Error',
  };
};

export default handleDuplicateKeyError;
