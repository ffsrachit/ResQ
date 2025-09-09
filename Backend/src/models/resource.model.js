import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }, // Food, Medicine, etc.
        quantity: {
            type: Number,
            required: true,
        },
        location: {
            lat: Number,
            lng: Number,
        },
        assignedToDisaster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disaster",
        },
        status: {
            type: String,
            enum: ["available", "allocated", "delivered"],
            default: "available",
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
