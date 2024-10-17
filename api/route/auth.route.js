import express from "express";
import { signup, signin, googleSignup } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", googleSignup)

export default authRouter;