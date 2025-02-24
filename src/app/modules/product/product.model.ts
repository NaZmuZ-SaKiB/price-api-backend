import { model, Schema } from "mongoose";
import { TProduct } from "./product.type";

const productSchema = new Schema<TProduct>({
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
    image: String,
    status: String,
},{
    timestamps: true,
})

export const Product = model<TProduct>('Product', productSchema);