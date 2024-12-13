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

export const getListingById = async (listingId) => {
    try{
        const listing = await Listing.findById(listingId).populate("userRef", "email username");
        return listing;
    }
    catch(err){
        throw {
            statusCode: 404,
            message: "Listing not found"
        }
    }
}


export const deleteListingById = async (listingId) => {
    try{
        const deletedListing = await Listing.findByIdAndDelete(listingId);
        return deletedListing;
    }
    catch(err){
        throw err;
    }
}

export const updateListingById = async (listingId, data) => {
    try{
        const updatedListing = await Listing.findByIdAndUpdate(listingId, data, {new: true});
        return updatedListing;
    }
    catch(err){
        throw err;
    }
}

export const getListingsByQuery = async (query) => {
    try{
        const listings = Listing.find({$or: [{title: {$regex : query, $options: "i"}}, {description: {$regex : query, $options: "i"}}]}).populate("userRef", "email username");
    }
    catch(err){
        throw err;
    }
}