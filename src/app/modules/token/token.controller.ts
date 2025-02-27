import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TokenService } from './token.service';

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

export const TokenController = {
  create,
  get,
  getAll,
  remove,
  removeExpiredTokens,
};
