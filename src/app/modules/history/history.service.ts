import calculatePagination from '../../utils/calculatePagination';
import { History } from './history.model';

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: ['url'].map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const history = await History.find({ ...searchConditions })
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await History.countDocuments({ ...searchConditions });

  return {
    data: history,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const clear = async () => {
  await History.deleteMany({});

  return;
};

export const HistoryService = {
  getAll,
  clear,
};
