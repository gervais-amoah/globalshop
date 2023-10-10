import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

import jwt from "jsonwebtoken";

//  @desc   Auth user & get token
//  @route  POST /api/users/login
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userOd: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 100, //  30 Days (milleseconds)
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//  @desc   Register user
//  @route  POST /api/users
//  @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});

//  @desc   Log user out & clear cookie
//  @route  POST /api/users/logout
//  @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Log user out");
});

//  @desc   Get user profile
//  @route  GET /api/users/profile
//  @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get user profile");
});

//  @desc   Update user profile
//  @route  PUT /api/users/profile
//  @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update user profile");
});

//  @desc   Get users
//  @route  GET /api/users
//  @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get all users");
});

//  @desc   Get user by ID
//  @route  GET /api/users/:id
//  @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("Get user by ID");
});

//  @desc   Update user
//  @route  PUT /api/users/:id
//  @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

//  @desc   Delete user
//  @route  DELETE /api/users/:id
//  @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
};
