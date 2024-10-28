import userModel from "../models/user.model.js";

export async function findUserById(id) {
  const user = await userModel.findById(id);
  return user;
}

export async function updateUserById(id, data) {
  const user = await userModel.findByIdAndUpdate(
    id,
    {
      $set: {
        username: data.username,
        email: data.email,
        profileImage: data.profileImage,
        password: data.password,
      },
    },
    {
      new: true,
    }
  );

  return user;

}
