import { model, Schema } from "mongoose";
import { TToken } from "./token.type";

const tokenSchema = new Schema<TToken>({
    name: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    exp: {
        type: Date,
        required: true,
    },
},{
    timestamps: true,
})

export const Token = model<TToken>('Token', tokenSchema);