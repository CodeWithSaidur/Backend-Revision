import mongoose from "mongoose";
// Tweet.model.js
const TweetSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Tweet = mongoose.model("Tweet", TweetSchema);