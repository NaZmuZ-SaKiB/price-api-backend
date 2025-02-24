import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TTokenAccess } from '../modules/token/token.type';
import catchAsync from '../utils/catchAsync';

const access = (...requiredAccess: TTokenAccess[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.token;
    const hasAccess = requiredAccess.includes(token.access);

    if (!hasAccess) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Access denied');
    }

    next();
  });
};

export default access;
