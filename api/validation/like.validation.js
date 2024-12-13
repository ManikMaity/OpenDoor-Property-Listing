import {z} from "zod";

export const likeValidation = z.object({
    likeType : z.enum(["like", "dislike", "engry", "funny", "wow"]).default("like"),
    listing : z.string("Listing id should be a string").min(1, "Listing id is required")
})