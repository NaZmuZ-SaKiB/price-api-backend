import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const getAll = catchAsync(async (req, res) => {
  const result = await ProductService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await ProductService.update(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

const updateCount = catchAsync(async (req, res) => {
  const result = await ProductService.updateCount();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Got Count successfully',
    data: result,
  });
});

export const ProductController = {
  getAll,
  update,
  updateCount,
};
