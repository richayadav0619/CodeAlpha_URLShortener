import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: null,
        },
    visitHistory: [
    {
        timestamp: {
            type: Number,
        },
        ip: {
            type: String,
        },
        userAgent: {
            type: String,
        },
    },
],
    },
    {
        timestamps: true,
    }
);

export const URL = mongoose.model("URL", urlSchema);