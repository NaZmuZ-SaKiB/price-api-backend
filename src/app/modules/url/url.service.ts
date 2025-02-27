import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import calculatePagination from '../../utils/calculatePagination';
import { Url } from './url.model';

const create = async (payload: TUrl) => {
  await Url.create(payload);

  return;
};

const get = async (id: string) => {
  const url = Url.findById(id);

  if (!url) {
    throw new AppError(httpStatus.NOT_FOUND, 'Url not found');
  }

  return url;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: ['name', 'url'].map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const urls = await Url.find({ ...searchConditions })
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Url.countDocuments({ ...searchConditions });

  return {
    data: urls,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const update = async (id: string, payload: Partial<TUrl>) => {
  const url = await Url.findByIdAndUpdate(id, payload, { new: true });

  if (!url) {
    throw new AppError(httpStatus.NOT_FOUND, 'Url not found');
  }

  return;
};

const remove = async (id: string) => {
  const url = await Url.findByIdAndDelete(id);

  if (!url) {
    throw new AppError(httpStatus.NOT_FOUND, 'Url not found');
  }

  return;
};

export const UrlService = {
  create,
  get,
  getAll,
  update,
  remove,
};
