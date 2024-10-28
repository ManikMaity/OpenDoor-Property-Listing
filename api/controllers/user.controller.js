import bcrypt from "bcrypt";
import { SALT_ROUND } from "../var.js";
import { updateUserById } from "../repository/user.repo.js";

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

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedData,
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
