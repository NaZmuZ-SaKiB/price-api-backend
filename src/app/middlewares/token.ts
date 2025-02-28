import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { Token } from '../modules/token/token.model';
import { jwtHelpers } from '../utils/jwtHelpers';
import config from '../config';

const token = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Token not provided');
  }

  let decoded;

  try {
    decoded = await jwtHelpers.verifyToken(
      token,
      config.jwt_access_secret as string,
    );
  } catch (err) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid token. May be expired.',
    );
  }

  const isTokenExists = await Token.findOne({ token: decoded.payload?.token });

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
