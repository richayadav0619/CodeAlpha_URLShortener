import { Router } from "express";
import {
    generateShortURL,
    redirectURL,
    getAnalytics,
    deleteShortURL,
    getDashboard,
    searchURL,
    getStatistics,
    getAllURLs,
} from "../controllers/url.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: URL
 *   description: URL Shortener APIs
 */


/**
 * @swagger
 * /url:
 *   post:
 *     summary: Create a Short URL
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://www.google.com
 *               customAlias:
 *                 type: string
 *                 example: google
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-12-31T00:00:00.000Z
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *       400:
 *         description: Invalid URL
 */

// Create Short URL
router.post("/", generateShortURL);

/**
 * @swagger
 * /url:
 *   get:
 *     summary: Get all URLs with pagination
 *     tags: [URL]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: URLs fetched successfully
 */

// Get all URLs (Paginated)
router.get("/", getAllURLs);



/**
 * @swagger
 * /url/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [URL]
 *     responses:
 *       200:
 *         description: Dashboard fetched successfully
 */

// Dashboard
router.get("/dashboard", getDashboard);


/**
 * @swagger
 * /url/statistics:
 *   get:
 *     summary: Get URL statistics
 *     tags: [URL]
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 */


// Statistics
router.get("/statistics", getStatistics);



/**
 * @swagger
 * /url/search/{keyword}:
 *   get:
 *     summary: Search URLs
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         example: google
 *     responses:
 *       200:
 *         description: Matching URLs found
 *       404:
 *         description: No matching URLs found
 */

// Search URL
router.get("/search/:keyword", searchURL);



/**
 * @swagger
 * /url/analytics/{shortId}:
 *   get:
 *     summary: Get URL analytics
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         example: google
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 *       404:
 *         description: Short URL not found
 */

// Analytics
router.get("/analytics/:shortId", getAnalytics);



/**
 * @swagger
 * /url/{shortId}:
 *   delete:
 *     summary: Delete short URL
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         example: google
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *       404:
 *         description: Short URL not found
 */

// Delete URL
router.delete("/:shortId", deleteShortURL);



/**
 * @swagger
 * /url/{shortId}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         example: google
 *     responses:
 *       302:
 *         description: Redirect successful
 *       404:
 *         description: Short URL not found
 */

// Redirect URL (keep this LAST)
router.get("/:shortId", redirectURL);


export default router;