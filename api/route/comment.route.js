import {Router} from "express";
import { verifyToken } from "../util/verifyUser.js";
import { createCommentController, createReplyController, deleteCommentController, getListingCommentsController, getRepliesOfCommnetController, updateCommentController } from "../controllers/comment.controller.js";
import { validate } from "../validation/validator.js";
import createCommentSehma, { createReplySchema } from "../validation/comment.validation.js";
const commentRouter = Router();

commentRouter.get("/", (req, res) => {
    res.json({
        success : true,
        message : "Router is working."
    })
})
commentRouter.get("/:id", verifyToken, getListingCommentsController); 
commentRouter.post("/", verifyToken,validate(createCommentSehma), createCommentController);
commentRouter.delete("/:id", verifyToken, deleteCommentController);
commentRouter.put("/:id", verifyToken, updateCommentController);
commentRouter.get("/replies/:id", verifyToken, getRepliesOfCommnetController); 
commentRouter.post("/reply/:id", verifyToken, validate(createReplySchema), createReplyController); 

export default commentRouter;
