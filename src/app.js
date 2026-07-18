import express from "express";
import urlRouter from "./routes/url.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRouter);

app.get("/", (req, res) => {
    res.send("URL Shortener API Running 🚀");
});

app.get("/test", (req, res) => {
    res.json({
        message: "Test route works!"
    });
});


export { app };