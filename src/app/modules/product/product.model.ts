import { model, Schema } from 'mongoose';
import { TProduct } from './product.type';

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    image: String,
    status: String,
    lastChecked: Date,
    lastModified: Date,
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
