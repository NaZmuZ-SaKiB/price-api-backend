import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TokenService } from './token.service';
import AppError from '../../errors/AppError';

const create = catchAsync(async (req, res) => {
  const result = await TokenService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Token created successfully',
    data: result,
  });
});

const get = catchAsync(async (req, res) => {
  const result = await TokenService.get(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token fetched successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await TokenService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tokens fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await TokenService.remove(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token removed successfully',
    data: result,
  });
});

const removeExpiredTokens = catchAsync(async (req, res) => {
  const result = await TokenService.removeExpiredTokens();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expired tokens removed successfully',
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  if (!req.body?.token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Token is required');
  }

  const result = await TokenService.signIn(req.body?.token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sign in successfully',
    data: result,
  });
});

const dashboard = catchAsync(async (req, res) => {
  const result = await TokenService.dashboard();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard fetched successfully',
    data: result,
  });
});

export const TokenController = {
  create,
  get,
  getAll,
  remove,
  removeExpiredTokens,
  signIn,
  dashboard,
};
