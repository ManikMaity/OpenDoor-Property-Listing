import bcrypt from "bcrypt";
import { SALT_ROUND } from "../var.js";
import userModel from "../models/user.model.js";

export async function signup (req, res, next) {
    try{
        const { username, email, password } = req.body;
        const encryptedPassword = bcrypt.hashSync(`${password}`, SALT_ROUND)
        await userModel.create({
            username,
            email,
            password : encryptedPassword
        })
        res.json({msg : "User successfully created!✔️"})

    }
    catch(err){
       next(err)
    }
}