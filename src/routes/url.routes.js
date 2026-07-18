import { Router } from "express";
import {
    generateShortURL,
    redirectURL,
    getAnalytics,
    deleteShortURL,
} from "../controllers/url.controller.js";

const router = Router();

/**
 * @swagger
 * /url:
 *   post:
 *     summary: Create a Short URL
 *     tags:
 *       - URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 * /url/analytics/{shortId}:
 *   get:
 *     summary: Get URL Analytics
 *     tags:
 *       - URL
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
 *     summary: Delete Short URL
 *     tags:
 *       - URL
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

// Delete Short URL
router.delete("/:shortId", deleteShortURL);


/**
 * @swagger
 * /url/{shortId}:
 *   get:
 *     summary: Redirect to Original URL
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         example: google
 *     responses:
 *       302:
 *         description: Redirects to original URL
 *       404:
 *         description: Short URL not found
 */

// Redirect
router.get("/:shortId", redirectURL);

export default router;