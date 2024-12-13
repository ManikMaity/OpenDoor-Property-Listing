import express from "express";
import { createListingController, createListingLikeController, deleteListing, editListing, getListing, getListingLikesController, getUserListings, searchListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../util/verifyUser.js";
import { validate } from "../validation/validator.js";
import { listingValidation } from "../validation/listingValidation.js";
import { editListingValidation } from "../validation/editListingValidation.js";
import { likeValidation } from "../validation/like.validation.js";
const listingRouter = express.Router();

listingRouter.get("/test", (req, res) => {
    res.json({ msg: "Listing route is working!" });
})

listingRouter.post("/create", validate(listingValidation),  verifyToken, createListingController);
listingRouter.get("/user/:id", verifyToken, getUserListings);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.post("/edit/:id", validate(editListingValidation), verifyToken, editListing);
listingRouter.get("/data/:id", getListing);
listingRouter.get("/search", searchListing);
listingRouter.post("/like", validate(likeValidation), verifyToken, createListingLikeController);
listingRouter.get("/likes/:id", getListingLikesController);

export default listingRouter;