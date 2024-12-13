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
commentRouter.get("/:id", verifyToken, getListingCommentsController); // get comments by listing
commentRouter.post("/", verifyToken,validate(createCommentSehma), createCommentController); // create a comment
commentRouter.delete("/:id", verifyToken, deleteCommentController); // delete a comment
commentRouter.put("/:id", verifyToken, updateCommentController); // update a comment
commentRouter.get("/replies/:id", verifyToken, getRepliesOfCommnetController); // get replies by comment
commentRouter.post("/reply/:id", verifyToken, validate(createReplySchema), createReplyController); // create a reply

export default commentRouter;
