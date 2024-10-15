import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { connectDB } from "./db.js";
import userRouter from "./route/user.route.js";
import authRouter from "./route/auth.route.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:3000");
});
