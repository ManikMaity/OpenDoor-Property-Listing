import express from "express";
import { test, update } from "../controllers/user.controller.js";
import { verifyToken } from "../util/verifyUser.js";
const userRouter = express.Router();

userRouter.get("/", test);
userRouter.post("/update/:id", verifyToken, update);

export default userRouter;