import bcrypt from "bcrypt";
import { SALT_ROUND } from "../var.js";
import { deleteUserById, updateUserById } from "../repository/user.repo.js";

export function test(req, res) {
  res.json({ msg: "API route is working!" });
}

export async function update(req, res) {
  try {
    const reqId = req.params.id;
    const userId = req.user._id.toString();
    if (reqId !== userId)
      throw { statusCode: 401, message: "Unauthorized User" };
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, SALT_ROUND);
    }

    const updatedData = await updateUserById(reqId, req.body);
    const {password, ...apiResponseData} = updatedData._doc;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: apiResponseData,
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
}

export async function deleteUser(req, res) {
  try{
    const userId = req.user._id.toString();
    const reqId = req.params.id;
    if (reqId !== userId){
      throw {statusCode: 401, message: "Unauthorized User"};
    }
    const deletedData = await deleteUserById(reqId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedData
    })
  }
  catch(err){
    if (err.statusCode){
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    else{
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export async function signoutUser(req, res) {
  try{
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}