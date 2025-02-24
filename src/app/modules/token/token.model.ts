import { model, Schema } from "mongoose";
import { TToken } from "./token.type";

const tokenSchema = new Schema<TToken>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    access: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    exp: {
        type: Date,
        required: true,
    },
},{
    timestamps: true,
})

export const Token = model<TToken>('Token', tokenSchema);