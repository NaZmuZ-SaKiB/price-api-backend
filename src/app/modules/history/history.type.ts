import { Types } from 'mongoose';

export type THistory = {
  url: string;
  totalProducts: number;
  totalPages: number;
  newProducts: number;
  updatedProducts: number;
  scrapedBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
};
