import bcrypt from "bcrypt";
import { JWT_SECRET, SALT_ROUND } from "../var.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../util/error.js";
import { signinSchema } from "../validation/auth.validation.js";

export async function signup(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(`${password}`, SALT_ROUND);
    await userModel.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.json({ msg: "User successfully created!✔️" });
  } catch (err) {
    next(err);
  }
}

export async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    const isvalidated = signinSchema.safeParse(req.body);
    if (!isvalidated.success)
      throw errorHandler(400, isvalidated.error.issues[0].message);
    const user = await userModel.findOne({ email });
    if (!user) next(errorHandler(404, "User not found"));
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (isPasswordMatch == false)
      throw errorHandler(401, "Invalid credentials");
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    const { password: pass, ...userData } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userData);
  } catch (err) {
    next(err);
  }
}

export async function googleSignup(req, res, next) {
  try {
    const { username, email, profileImage } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {

        const password = Math.random().toString(36).slice(-8);
        const name = `${username.toLowerCase().split(" ").join("-")}${Math.random().toString(36).slice(-4)}`

        user = await userModel.create({
        username : name,
        password : bcrypt.hashSync(password, SALT_ROUND),
        email,
        profileImage,
      });
    }
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    const {password, ...restData} = user._doc;
    res.cookie("access-token", token, {httpOnly : true})
    .status(200)
    .json(restData);

  } catch (err) {
    next(err);
  }
}
