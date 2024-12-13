import {z} from "zod";

const createCommentSehma = z.object({
    content : z.string({
        required_error : "Comment Content is required",
        invalid_type_error : "Comment should be a string"
    }).min(1, "Comment is required")
    .max(500, "Comment should be less than 500 characters"),
    listing : z.string({
        required_error : "Listing is required",
        invalid_type_error : "Listing should be a string"
    })
})

export const createReplySchema = z.object({
    content : z.string({
        required_error : "Reply Content is required",
        invalid_type_error : "Reply should be a string"
    }).min(1, "Reply is required")
    .max(500, "Reply should be less than 500 characters"),
    commentType : z.string({
        required_error : "Comment type is required",
        invalid_type_error : "Comment type should be a string"
    }).default("reply"),
    listing : z.string({
        required_error : "Listing is required",
        invalid_type_error : "Listing should be a string"
    })
})


export default createCommentSehma;