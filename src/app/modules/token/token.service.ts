import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Token } from './token.model';
import { TToken } from './token.type';

const create = async (payload: TToken) => {
  const isTokenExist = await Token.find({
    $or: [{ name: payload.name }, { token: payload.token }],
  });

  if (isTokenExist.length > 0) {
    throw new AppError(httpStatus.FORBIDDEN, 'Token already exist');
  }

  return await Token.create(payload);
};

const get = async (id: string) => {
  const token = await Token.findById(id);

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found');
  }

  return token;
};

const getAll = async () => {
  return await Token.find().sort({ createdAt: -1 });
};

const remove = async (id: string) => {
  const token = await Token.findByIdAndDelete(id);

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found');
  }

  return token;
};

const removeExpiredTokens = async () => {
  const expiredTokens = await Token.find({
    exp: { $lt: new Date() },
  });

  if (expiredTokens.length > 0) {
    await Token.deleteMany({
      expireAt: { $lt: new Date() },
    });
  }

  return;
};

export const TokenService = {
  create,
  get,
  getAll,
  remove,
  removeExpiredTokens,
};
