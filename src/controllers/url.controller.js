import shortid from "shortid";
import { URL } from "../models/url.model.js";

const generateShortURL = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            message: "URL is required",
        });
    }

    const shortId = shortid();

    await URL.create({
        shortId,
        redirectURL: url,
        visitHistory: [],
    });

    return res.status(201).json({
        shortId,
    });
};

export { generateShortURL };