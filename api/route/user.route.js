import express from "express";
import { test, update } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get("/", test);
userRouter.post("/update/:id", update);

export default userRouter;