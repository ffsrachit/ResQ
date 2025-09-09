import mongoose, { mongo } from "mongoose";

const volassignSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        disasterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disaster",
            required: true,
        },
        task: { type: String, required: true },
        status: {
            type: String,
            enum: ["assigned", "completed"],
            default: "assigned",
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Volassign = mongoose.model("Volassign", volassignSchema);
