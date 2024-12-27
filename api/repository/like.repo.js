import LikeModel from "../models/like.model.js";

export const createLike = async (data) => {
    const userId = data.user;
    const liked = await LikeModel.findOne({user : userId, listing : data.listing});
    if (liked) {
        await liked.deleteOne();
    }

    const like = await LikeModel.create(data);
    return like;
}

export const getLikesByListingId = async (listingId) => {
    const likes = await LikeModel.find({ listing: listingId });
    return likes;
};