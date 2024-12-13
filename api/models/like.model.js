import {Schema, model} from "mongoose";

const likeSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    likeType : {
        type : String,
        enum : ["like", "dislike", "engry", "funny", "wow"],
        default : "like"
    },
    listing : {
        type : Schema.Types.ObjectId,
        ref : "Listing",
        required : true
    }
})


const LikeModel = model("Like", likeSchema);
export default LikeModel;