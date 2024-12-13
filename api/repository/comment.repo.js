import CommentModel from "../models/comment.model.js";
import Listing from "../models/listing.model.js";

export const createComment = async (data) => {
    const listing = await Listing.findById(data.listing);
    if (!listing){
        throw {
            statusCode: 404,
            message : "Listing not found"
        }
    };
    const comment = await CommentModel.create(data);
    return comment;
}

export const createCommentReply = async (commentId, data) => {
    const comment = await CommentModel.create(data);
    await CommentModel.findByIdAndUpdate(commentId, { $push: {replies : comment._id}});
    return comment;
}

export const getCommentsByListingId = async (listingId) => {
    const comments = await CommentModel.find({listing: listingId}).populate("user", "email username");
    return comments;
}

export const deleteCommentById = async (commentId, userId) => {
    const comment = await CommentModel.findById(commentId);
    if (!comment){
        throw {
            statusCode: 404,
            message : "Comment not found"
        }
    }

    if (comment.user.toString() !== userId.toString()) {
        throw {
            statusCode: 401,
            message : "You are not authorized to delete this comment"
        }
    }
    
    await comment.deleteOne();
    return comment;
};

export const updateCommentById = async (commentId, content, userId) => {

    const comment = await CommentModel.findById(commentId);
    if (!comment){
        throw {
            statusCode: 404,
            message : "Comment not found"
        }
    }

    if (comment.user.toString() !== userId.toString()) {
        throw {
            statusCode: 401,
            message : "You are not authorized to update this comment"
        }
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(commentId, {content}, {new: true});
    return updatedComment;
};

export const getCommentReplyById = async (commentId) => {
    const comment = CommentModel.findById(commentId).populate({
        path: "replies",
        populate: [
            { path: "user", select: "name email" },
            { path: "replies" } 
        ]
    })

    return comment;
};