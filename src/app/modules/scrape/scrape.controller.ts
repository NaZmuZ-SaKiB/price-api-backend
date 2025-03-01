import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ScrapeService } from './scrape.service';

const scrape = catchAsync(async (req, res) => {
  const result = await ScrapeService.scrape(req.token, req.body?.url);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Scraped successfully',
    data: result,
  });
});

export const ScrapeController = {
  scrape,
};
