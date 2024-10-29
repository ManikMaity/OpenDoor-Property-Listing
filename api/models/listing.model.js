import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    propertyType : {
        type : String,
        default : "House"
    },
    address : {
        type : String,
        required : true
    },
    regularPrice : {
        type : Number,
        required : true
    },
    discountedPrice : {
        type : Number,
        required : true
    },
    bathrooms : {
        type : Number,
        required : true
    },
    bedrooms : {
        type : Number,
        required : true
    },
    area : {
        type : Number,
        required : true
    },
    parkingSpaces : {
        type : Number,
        required : true
    },
    furnished : {
        type : Boolean,
        required : true
    },
    offer : {
        type : Boolean,
        default : false
    }, 
    imageUrls : {
        type : [String],
        required : true
    },
    userRef : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    ytVideoUrl : {
        type : String,
    },
    facilities : {
        type : [String],
    }
}, { timestamps : true });

const Listing =  mongoose.model("Listing", listingSchema);

export default Listing;