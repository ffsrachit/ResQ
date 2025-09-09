import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema(
    {
        type: { type: String, required: true }, // Flood, Earthquake, etc.
        description: {
            type: String
        },
        location: {
            lat: Number,
            lng: Number,
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low"
        },

        status:
        {
            type: String,
            enum: ["active", "resolved"],
            default: "active"
        },
        reportedBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Disaster = mongoose.model("Disaster", disasterSchema);
