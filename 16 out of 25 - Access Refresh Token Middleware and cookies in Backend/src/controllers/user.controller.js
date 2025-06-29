// user.controller.js
import { asyncHandler } from "../utils/asynHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access tokens",
        );
    }
};

export const registerUser = asyncHandler(async (req, res) => {
    // Get user details
    const { fullname, email, username, password } = req.body;
    console.log("Email:", email);

    // Validate inputs
    if ([fullname, email, username, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Check for avatar file
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    if (!avatar?.url) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // Create user
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    // Remove password and refreshToken from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    // Send response
    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered successfully"),
        );
});

export const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    const { username, email, password } = req.body;

    // username or email
    if (!username || !email) {
        throw new ApiError(400, "Username or email is required");
    }

    // find the user
    const existuser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (!existuser) {
        throw new ApiError(404, "User does not exist");
    }

    // password check
    const isPasswordValid = await existuser.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // acces and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
        existuser._id,
    );

    // db hit again
    const loggedInUser = await User.findById(existuser._id).select(
        "-password -refreshToken",
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User loged in Successfully",
            ),
        );
});

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.existuser._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        },
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookies("accessToken", options)
        .clearCookies("refreshToken", options)
        .json(new ApiError(200, "User loged out"));
});
