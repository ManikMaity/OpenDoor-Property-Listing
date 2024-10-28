import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../var.js";
import { findUserById } from "../repository/user.repo.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw {
        statusCode: 401,
        message: "No token provided",
      };
    }

    const decodedData = jwt.verify(token, JWT_SECRET);
    const userid = decodedData.userId;
    const user = await findUserById(userid);

    if (!user) {
      throw {
        statusCode: 401,
        message: "Invalid token",
      };
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid token",
        err: err.message,
      });

      console.log(err);
    }
  }
};
