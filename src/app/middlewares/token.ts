import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { Token } from '../modules/token/token.model';

const token = catchAsync(async (req, res, next) => {
  const token = req.query?.apiKey;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Token not provided');
  }

  const isTokenExists = await Token.findOne({ token: token });

  if (!isTokenExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }

  const isExpired = new Date(isTokenExists.exp) < new Date();

  if (isExpired) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Token expired');
  }

  req.token = isTokenExists;
  next();
});

export default token;
