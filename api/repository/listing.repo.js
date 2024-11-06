import Listing from "../models/listing.model.js";

export async function createListing(data) {
    try {
        const listing = await Listing.create(data);
        return listing;
    }
    catch(err){
        throw err;
    }
}

export const getAllListingsByUserId = async (userId) => {
    try {
        const userListings = await Listing.find({userRef: userId});
        return userListings;
    }
    catch (err) {
        throw err;
    }
}