import { Router } from "express";
import { generateShortURL } from "../controllers/url.controller.js";

console.log("✅ url.routes.js loaded");

const router = Router();

router.post("/", (req, res, next) => {
    console.log("✅ POST /url reached");
    next();
});

router.post("/", generateShortURL);

export default router;