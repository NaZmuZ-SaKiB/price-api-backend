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

  const products = await Product.find({ ...searchConditions })
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments({ ...searchConditions });

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
