import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    isverified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationtoken: {
      type: String,
    },
    verificationtokenexp: {
      type: Date,
    },
    passwordresettoken: {
      type: String,
    },
    passwordresettokenexp: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
export default User;
