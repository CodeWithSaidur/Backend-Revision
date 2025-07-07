import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynHandlers.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.accessToken;

  // Check for token in Authorization header if not in cookies
  if (!token) {
    const authHeader = req.header("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  // No token found in either location
  if (!token) {
    throw new ApiError(401, "Unauthorized request: No token provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid or expired token");
  }

  const user = await User.findById(decoded?._id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid or expired access token: User not found");
  }

  // Optionally log decoded payload in development mode
  if (process.env.NODE_ENV === "development") {
    console.log("Authenticated user:", {
      id: user._id,
      email: user.email,
      role: user.role,
    });
  }

  req.user = user;
  next();
});
