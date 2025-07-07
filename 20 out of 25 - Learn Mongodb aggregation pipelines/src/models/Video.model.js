import mongoose from 'mongoose';
import mongooseAggragatePaginate from 'mongoose-aggregate-paginate-v2';

// Video.model.js
const VideoSchema = new mongoose.Schema(
  {
    videofile: {
      type: String, // clodinary URL
      required: true,
    },
    thumbnail: {
      type: String, // clodinary URL
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number, // clodinary URL
      required: true,
    },
    views: {
      type: Number, // clodinary URL
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

VideoSchema.plugin(mongooseAggragatePaginate);

export const Video = mongoose.model(
  'Video',
  VideoSchema
);
