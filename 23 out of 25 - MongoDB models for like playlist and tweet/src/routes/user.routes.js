// user.routes.js
import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getwatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser,
);

router.route("/login").post(loginUser);
router.route("/getUser").get(getUserChannelProfile);

// Secure route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avater").patch(
  verifyJWT,
  upload.single("avater"),
  updateUserAvatar,
);
router.route("/cover-image").patch(
  verifyJWT,
  upload.single("coverImage"),
  updateUserCoverImage,
);

router.route("/c/:uername").get(verifyJWT, getUserChannelProfile);
router.route("/histry").get(verifyJWT, getwatchHistory);
export default router;
