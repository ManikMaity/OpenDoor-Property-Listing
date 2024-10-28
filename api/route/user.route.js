import express from "express";
import { deleteUser, test, update } from "../controllers/user.controller.js";
import { verifyToken } from "../util/verifyUser.js";
const userRouter = express.Router();

userRouter.get("/", test);
userRouter.post("/update/:id", verifyToken, update);
userRouter.delete("/delete/:id", verifyToken, deleteUser);

export default userRouter;