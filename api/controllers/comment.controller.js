import {
  createComment,
  createCommentReply,
  deleteCommentById,
  getCommentReplyById,
  getCommentsByListingId,
  updateCommentById,
} from "../repository/comment.repo.js";

const handleErrorResponse = (res, err) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getListingCommentsController = async (req, res) => {
  try {
    const listingId = req.params.id;
    const comments = await getCommentsByListingId(listingId);
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

export const createCommentController = async (req, res) => {
  try {
    const userId = req.user._id;
    const comment = await createComment({ ...req.body, user: userId });
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;
    const deletedComment = await deleteCommentById(commentId, userId);
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: deletedComment,
    });
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

export const updateCommentController = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;
    const newContent = req.body.content || null;
    if (!newContent || newContent === "") {
      throw {
        statusCode: 400,
        message: "No content provided",
      };
    }

    const updatedComment = await updateCommentById(commentId, newContent, userId);
    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment, 
    });

  } catch (err) {
    handleErrorResponse(res, err);
  }
};


export const getRepliesOfCommnetController = async (req, res) => {
    try {
        const commentId = req.params.id;
        const replies = await getCommentReplyById(commentId);
        return res.status(200).json({
            success: true,
            message: "Replies fetched successfully",
            data: replies,
        });
    }
    catch(err){
        handleErrorResponse(res, err);
    }
}

export const createReplyController = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user._id;
        const reply = await createCommentReply(commentId, {...req.body, user: userId});
        return res.status(201).json({
            success: true,
            message: "Reply created successfully",
            data: reply
        })
    }
    catch(err){
        handleErrorResponse(res, err);
    }
}