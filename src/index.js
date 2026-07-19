import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8001, () => {
            console.log(`⚙️ Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB Connection Failed:", err);
    });