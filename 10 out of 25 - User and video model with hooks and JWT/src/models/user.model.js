import mongoose from 'mongoose';
import bcrypt from 'bcryt';
import jwt from 'jsonwebtoken';

// User.model.js
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, // clodinary URL
      required: true,
    },
    coverImage: {
      type: String, // clodinary URL
    },
    watchHistory: [
      {
        type: Schema.Type.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(
    this.password,
    salt
  );
  next();
});

UserSchema.methods.ispswordCrect =
  async function (password) {
    return await bcrypt.compare(
      password,
      this.password
    );
  };

UserSchema.methods.generateAccessToken =
  function () {
    jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },

      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:
          process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };

UserSchema.methods.generateRefreshToken =
  function () {
    jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },

      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:
          process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };

export const User = mongoose.model(
  'User',
  UserSchema
);
