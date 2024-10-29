import express from "express";
import { createListingController } from "../controllers/listing.controller.js";
import { verifyToken } from "../util/verifyUser.js";
import { validate } from "../validation/validator.js";
import { listingValidation } from "../validation/listingValidation.js";
const listingRouter = express.Router();

listingRouter.get("/test", (req, res) => {
    res.json({ msg: "Listing route is working!" });
})

listingRouter.post("/create", validate(listingValidation),  verifyToken, createListingController);

export default listingRouter;