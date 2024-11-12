import {
  createListing,
  deleteListingById,
  getAllListingsByUserId,
  getListingById,
  updateListingById,
} from "../repository/listing.repo.js";

export const createListingController = async (req, res) => {
  try {
    const data = {
      ...req.body,
      userRef: req.user._id,
    };
    const listing = await createListing(data);
    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const getUserListings = async (req, res) => {
  try {
    const inputUserId = req.params.id;
    const userId = req.user._id;
    if (inputUserId !== userId.toString()) {
      throw {
        statusCode: 401,
        message: "Unauthorized User",
      };
    } else {
      const listings = await getAllListingsByUserId(inputUserId);
      res.status(200).json({
        success: true,
        message: "Listings fetched successfully",
        data: listings,
      });
    }
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const reqUserId = req.user._id;
    const listing = await getListingById(listingId);
    if (listing.userRef.toString() !== reqUserId.toString()) {
      throw {
        statusCode: 401,
        message: "Unauthorized User",
      };
    }
    const deletedListing = await deleteListingById(listingId);

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
      data: deletedListing,
    });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const editListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const reqUserId = req.user._id;
    const data = req.body;
    if (Object.keys(data).length === 0) {
      throw {
        statusCode: 400,
        message: "No data provided",
      };
    }
    const listing = await getListingById(listingId);
    if (!listing) {
      throw {
        statusCode: 404,
        message: "Listing not found",
      };
    }
    if (listing.userRef.toString() !== reqUserId.toString()) {
      throw {
        statusCode: 401,
        message: "Unauthorized User",
      };
    }
    const updatedListing = await updateListingById(listingId, data);

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing,
    });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const getListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await getListingById(listingId);
      res.status(200).json({
        success: true,
        message: "Listing data fetched successfully",
        data: listing,
      });
    
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};
