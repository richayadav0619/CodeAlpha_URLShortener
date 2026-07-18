import shortid from "shortid";
import validator from "validator";
import { URL } from "../models/url.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateShortURL = asyncHandler(async (req, res) => {
    const { url, customAlias, expiresAt } = req.body;

    if (!url) {
    throw new ApiError(400, "URL is required");
}

    if (!validator.isURL(url)) {
    throw new ApiError(400, "Invalid URL");
}

// Check duplicate URL
const existingURL = await URL.findOne({
    redirectURL: url,
});

if (existingURL) {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    shortId: existingURL.shortId,
                    shortURL: `${req.protocol}://${req.get("host")}/url/${existingURL.shortId}`,
                },
                "Short URL already exists"
            )
        );
    }

// check custom alias availability

if (customAlias) {
    const aliasExists = await URL.findOne({
        shortId: customAlias,
    });

    if (aliasExists) {
            throw new ApiError(409, "Custom alias already exists");
    }
}

    const shortId = customAlias || shortid();

    await URL.create({
    shortId,
    redirectURL: url,
    expiresAt,
    visitHistory: [],
    });

    return res.status(201).json(
    new ApiResponse(
        201,
        {
            shortId,
            shortURL: `${req.protocol}://${req.get("host")}/url/${shortId}`,
        },
        "Short URL created successfully"
    )
);
 
});

// redirect URL

const redirectURL = asyncHandler(async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        throw new ApiError(404, "Short URL not found");
    }

    //  Expiry check 
    if (entry.expiresAt && new Date() > entry.expiresAt) {
        throw new ApiError(410, "This short URL has expired");
    }

    return res.redirect(entry.redirectURL);
});


// analytics and delete short URL

const getAnalytics = asyncHandler(async (req, res) => {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    if (!result) {
        throw new ApiError(404, "Short URL not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalClicks: result.visitHistory.length,
                analytics: result.visitHistory,
            },
            "Analytics retrieved successfully"
        )
    );
});

// delete URL

const deleteShortURL = asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    const deletedURL = await URL.findOneAndDelete({ shortId });

    if (!deletedURL) {
        throw new ApiError(404, "Short URL not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Short URL deleted successfully"
        )
    );
});

export { 
    generateShortURL, 
    redirectURL, 
    getAnalytics, 
    deleteShortURL 
};