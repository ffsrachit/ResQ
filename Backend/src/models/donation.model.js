import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["money", "resource"],
      required: true,
    },
    amount: Number, // For money donations
    resourceDetails: {
      name: String,
      quantity: Number,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
