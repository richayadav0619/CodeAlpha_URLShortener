import express from "express";
import urlRouter from "./routes/url.routes.js";
import morgan from "morgan";
import helmet from "helmet";
import { limiter } from "./middlewares/rateLimiter.middleware.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use("/url", urlRouter);

app.get("/", (req, res) => {
    res.send("URL Shortener API Running 🚀");
});

app.get("/test", (req, res) => {
    res.json({
        message: "Test route works!"
    });
});

app.use(errorHandler);
export { app };