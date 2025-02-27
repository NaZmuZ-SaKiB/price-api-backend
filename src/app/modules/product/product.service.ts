import { FilterQuery } from 'mongoose';
import calculatePagination from '../../utils/calculatePagination';
import { productSearchableFields } from './product.constant';
import { Product } from './product.model';
import { TProduct } from './product.type';

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  const searchConditions = {
    $or: productSearchableFields.map((field) => ({
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: {
                $replaceAll: { input: `$${field}`, find: ' ', replacement: '' },
              },
              regex: filters?.searchTerm || '',
              options: 'i',
            },
          },
        },
        {
          [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
        },
      ],
    })),
  };

  const query: FilterQuery<TProduct> = {};

  if (filters?.done) {
    query.done = filters.done === 'true' ? true : false;
  }

  const products = await Product.find({ ...searchConditions, ...query })
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments({ ...searchConditions, ...query });

  return {
    data: products,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const update = async (id: string, payload: Partial<TProduct>) => {
  await Product.findByIdAndUpdate(id, payload);

  return;
};

export const ProductService = {
  getAll,
  update,
};
