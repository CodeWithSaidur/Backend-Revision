// user.controller.js
import { asyncHandler } from "../utils/asynHandlers.js";

export const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    });
});
