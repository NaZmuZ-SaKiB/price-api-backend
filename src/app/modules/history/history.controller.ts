import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HistoryService } from './history.service';

const getAll = catchAsync(async (req, res) => {
  const result = await HistoryService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'History fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const clear = catchAsync(async (req, res) => {
  const result = await HistoryService.clear();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'History cleared successfully',
    data: result,
  });
});

export const HistoryController = {
  getAll,
  clear,
};
