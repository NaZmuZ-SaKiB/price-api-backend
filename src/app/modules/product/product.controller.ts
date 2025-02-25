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

export const ProductController = {
  getAll,
};
