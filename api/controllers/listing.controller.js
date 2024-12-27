import { createLike, getLikesByListingId } from "../repository/like.repo.js";
import {
  createListing,
  deleteListingById,
  getAllListingsByUserId,
  getDetailedListingById,
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
    console.log(listing.userRef, reqUserId);
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
    const listing = await getDetailedListingById(listingId);
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

export const searchListing = (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offer = req.query.offer || undefined;

    if (offer === "false" || offer === undefined) {
      offer = { $in: [false, true] };
    }

    const furnished = req.query.furnished || undefined;

    if (furnished === "false" || furnished === undefined) {
      furnished = { $in: [false, true] };
    }

    const parkingSpaces = req.query.parkingSpaces || undefined;

    if (parkingSpaces === "false" || parkingSpaces === undefined) {
      parkingSpaces = { $in: [false, true] };
    }

    const type = req.query.type || undefined;
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

export const getListingLikesController = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await getListingById(listingId);
    if (!listing) {
      throw {
        statusCode: 404,
        message: "Listing not found",
      };
    }
    const likes = await getLikesByListingId(listingId);

    const likesCount = {
      like: 0,
      dislike: 0,
      engry: 0,
      funny: 0,
      wow: 0,
    };

    likes.forEach(like => {
      likesCount[like?.likeType] ++;
    })

    res.status(200).json({
      success: true,
      message: "Listing likes fetched successfully",
      data: {
        likesCount,
        likes
      },
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

export const createListingLikeController = async (req, res) => {
  try {
    const userId = req.user._id;
    const listingId = req.body.listing;
    const listing = await getListingById(listingId);
    if (!listing) {
      throw {
        statusCode: 404,
        message: "Listing not found",
      };
    }

    const like = await createLike({ user: userId, ...req.body });
    res.status(200).json({
      success: true,
      message: "Listing like created successfully",
      data: like,
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
