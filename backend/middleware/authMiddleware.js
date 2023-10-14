import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //  Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Unauthorized, token failed");
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Unauthorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized, no token");
  }
});

//  Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { admin, protect };
