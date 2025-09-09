import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        disasterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disaster",
        },
        audience: {
            type: String,
            enum: ["all", "volunteers", "admins"],
            default: "all",
        },
    },
    { timestamps: true }
);

export const Alert = mongoose.model("Alert", alertSchema);
