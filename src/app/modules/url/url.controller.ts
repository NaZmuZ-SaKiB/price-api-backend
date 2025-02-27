import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UrlService } from './url.service';

const create = catchAsync(async (req, res) => {
  const result = await UrlService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: result,
    message: 'Url created successfully',
  });
});

const update = catchAsync(async (req, res) => {
  const result = await UrlService.update(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Url updated successfully',
  });
});

const get = catchAsync(async (req, res) => {
  const result = await UrlService.get(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Url retrieved successfully',
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await UrlService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result.data,
    meta: result.meta,
    message: 'Urls retrieved successfully',
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await UrlService.remove(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    data: result,
    message: 'Url deleted successfully',
  });
});

export const UrlController = {
  create,
  update,
  get,
  getAll,
  remove,
};
