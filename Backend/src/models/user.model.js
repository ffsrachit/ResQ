import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "volunteer", "user", "ngo"],
      default: "user",
    },
    skills: [{ type: String }], // For volunteers
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);