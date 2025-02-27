import { model, Schema } from 'mongoose';
import { TUrl } from './url.type';

const urlSchema = new Schema<TUrl>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Url = model<TUrl>('Url', urlSchema);
