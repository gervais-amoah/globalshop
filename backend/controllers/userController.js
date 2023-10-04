import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

//  @desc   Auth user & get token
//  @route  POST /api/users/login
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
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
