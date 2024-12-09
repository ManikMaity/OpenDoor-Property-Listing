import express from "express";
import { createListingController, deleteListing, editListing, getListing, getUserListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../util/verifyUser.js";
import { validate } from "../validation/validator.js";
import { listingValidation } from "../validation/listingValidation.js";
import { editListingValidation } from "../validation/editListingValidation.js";
const listingRouter = express.Router();

listingRouter.get("/test", (req, res) => {
    res.json({ msg: "Listing route is working!" });
})

listingRouter.post("/create", validate(listingValidation),  verifyToken, createListingController);
listingRouter.get("/user/:id", verifyToken, getUserListings);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.post("/edit/:id", validate(editListingValidation), verifyToken, editListing);
listingRouter.get("/data/:id", getListing);

export default listingRouter;