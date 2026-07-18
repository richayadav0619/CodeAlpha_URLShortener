import { Router } from "express";
import {
    generateShortURL,
    redirectURL,
    getAnalytics,
    deleteShortURL,
} from "../controllers/url.controller.js";

const router = Router();

// Create Short URL
router.post("/", generateShortURL);

// Analytics
router.get("/analytics/:shortId", getAnalytics);

// Delete Short URL
router.delete("/:shortId", deleteShortURL);

// Redirect
router.get("/:shortId", redirectURL);

export default router;