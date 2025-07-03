import { asyncHandler } from "../utils/asynHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// Token generator
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  // console.log(req.body);

  if ([fullname, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // console.log(req.files);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar?.url) {
    throw new ApiError(400, "Avatar upload failed");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully"),
  );
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!existingUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    existingUser._id,
  );

  const loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
      }, "User logged in successfully"),
    );
});

// Logout user
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

// Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken ||
    req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request: Missing refresh token");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (err) {
    throw new ApiError(403, "Invalid or expired refresh token");
  }

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(403, "Refresh token mismatch");
  }

  const { accessToken, newrefreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // use secure cookies in prod
    sameSite: "Strict", // prevents CSRF
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", newrefreshToken, cookieOptions)
    .json(
      new ApiResponse(200, {
        accessToken,
        refreshToken: newrefreshToken,
      }, "Access token refreshed successfully"),
    );
});
