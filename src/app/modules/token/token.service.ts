import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Token } from './token.model';
import { TToken } from './token.type';
import calculatePagination from '../../utils/calculatePagination';
import { jwtHelpers } from '../../utils/jwtHelpers';
import config from '../../config';
import { Product } from '../product/product.model';
import { Url } from '../url/url.model';
import { History } from '../history/history.model';

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

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: ['name', 'url'].map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };
  const tokens = await Token.find({ ...searchConditions })
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Token.countDocuments({ ...searchConditions });

  return {
    data: tokens,
    meta: {
      page,
      limit,
      total,
    },
  };
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

const signIn = async (token: string) => {
  const tokenExists = await Token.findOne({ token });

  if (!tokenExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found');
  }

  const jwt = jwtHelpers.generateToken(
    { token: tokenExists?.token, access: tokenExists?.access },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return jwt;
};

const dashboard = async () => {
  const totalTokens = await Token.countDocuments();
  const totalExpiredTokens = await Token.countDocuments({
    exp: { $lt: new Date() },
  });

  const totalProducts = await Product.countDocuments();
  const priceUpdates = await Product.find({ done: false }).countDocuments();

  const savedUrls = await Url.countDocuments();
  const history = await History.countDocuments();

  return {
    totalTokens,
    totalExpiredTokens,
    totalProducts,
    priceUpdates,
    savedUrls,
    history,
  };
};

export const TokenService = {
  create,
  get,
  getAll,
  remove,
  removeExpiredTokens,
  signIn,
  dashboard,
};
