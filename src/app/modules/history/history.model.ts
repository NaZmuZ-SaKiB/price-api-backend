import { model, Schema } from 'mongoose';
import { THistory } from './history.type';

const historySchema = new Schema<THistory>(
  {
    url: {
      type: String,
      required: true,
    },
    totalProducts: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    newProducts: {
      type: Number,
      required: true,
    },
    updatedProducts: {
      type: Number,
      required: true,
    },
    scrapedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Token',
    },
  },
  {
    timestamps: true,
  },
);

export const History = model<THistory>('History', historySchema);
