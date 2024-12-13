import {Schema, model} from "mongoose";

const commentShema = new Schema({
    content : {
        type : String,
        required : true,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    commentType : {
        type : String,
        enum : ["comment", "reply"],
        default : "comment"
    },
    replies : [{
        type : Schema.Types.ObjectId,
        ref : "Comment",
        default : []
    }],
    listing : {
        type : Schema.Types.ObjectId,
        ref : "Listing",
        required : true
    }
}, {timestamps : true});


const CommentModel = model("Comment", commentShema);
export default CommentModel;