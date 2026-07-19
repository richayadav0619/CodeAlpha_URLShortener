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

    const url = await URL.findOne({
        shortId
    });

    if (!url) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }

    url.visitHistory.push({
        timestamp: Date.now()
    });

    await url.save();

    res.redirect(url.redirectURL);
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
                analytics: result.visitHistory.map((visit) => ({
                date: new Date(visit.timestamp).toLocaleDateString("en-IN"),
                time: new Date(visit.timestamp).toLocaleTimeString("en-IN"),
                _id: visit._id
            })),
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

// get dashboard stats

const getDashboard = asyncHandler(async (req, res) => {

    const totalURLs = await URL.countDocuments();

    const activeURLs = await URL.countDocuments({
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    });

    const expiredURLs = await URL.countDocuments({
        expiresAt: {
            $lte: new Date(),
        },
    });

    const urls = await URL.find();

    let totalClicks = 0;

    urls.forEach((url) => {
        totalClicks += url.visitHistory.length;
    });

    return res.status(200).json(
    new ApiResponse(
        200,
        {
            totalURLs,
            activeURLs,
            expiredURLs,
            totalClicks,
        },
        "Dashboard fetched successfully"
    )
);
});



// 👇 Create the new function HERE
const searchURL = asyncHandler(async (req, res) => {
    const { keyword } = req.params;

    const urls = await URL.find({
        $or: [
            {
                shortId: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                redirectURL: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ],
    }).select("shortId redirectURL expiresAt");

    if (urls.length === 0) {
        throw new ApiError(404, "No matching URLs found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            urls,
            "Matching URLs found"
        )
    );
});

const getStatistics = asyncHandler(async (req, res) => {

    const totalURLs = await URL.countDocuments();

    const activeURLs = await URL.countDocuments({
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    });

    const expiredURLs = await URL.countDocuments({
    expiresAt: {
        $lte: new Date(),
    },
});
    const urls = await URL.find();

    let totalClicks = 0;

urls.forEach((url) => {
    totalClicks += url.visitHistory.length;
});

let mostClickedURL = null;

urls.forEach((url) => {
    if (
        !mostClickedURL ||
        url.visitHistory.length > mostClickedURL.visitHistory.length
    ) {
        mostClickedURL = url;
    }
});

return res.status(200).json(
    new ApiResponse(
        200,
        {
            totalURLs,
            activeURLs,
            expiredURLs,
            totalClicks,
            mostClickedURL: mostClickedURL
                ? {
                    shortId: mostClickedURL.shortId,
                    redirectURL: mostClickedURL.redirectURL,
                    clicks: mostClickedURL.visitHistory.length,
                }
                : null,
        },
        "Statistics fetched successfully"
    )
);

});


// get all urls
const getAllURLs = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const urls = await URL.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalURLs = await URL.countDocuments();

    const totalPages = Math.ceil(totalURLs / limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                currentPage: page,
                totalPages,
                totalURLs,
                urls,
            },
            "URLs fetched successfully"
        )
    );
});

export {
    generateShortURL,
    redirectURL,
    getAnalytics,
    deleteShortURL,
    getDashboard,
    searchURL,
    getStatistics,
    getAllURLs,
};
