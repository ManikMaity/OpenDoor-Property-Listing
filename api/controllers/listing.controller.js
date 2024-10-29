import { createListing } from "../repository/listing.repo.js";

export const createListingController = async (req, res) => {
    try{
        const data = {
            ...req.body,
            userRef : req.user._id
        }
        const listing = await createListing(data);
        res.status(201).json({
            success: true,
            message: "Listing created successfully",
            data: listing
        })
    }
    catch (err){
        if (err.statusCode){
            res.status(err.statusCode).json({
                success: false,
                message: err.message
            })
        }
        else{
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}