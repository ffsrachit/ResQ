import { Alert } from "../models/alert.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createAlert = asyncHandler(async(req,res)=>{
  const { message, disasterId, audience } = req.body;

  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  const alert = await Alert.create({
    message,
    disasterId,
    audience,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, alert, "Alert created successfully"));

});

const getAllAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find()
    .populate("disasterId", "type description location severity status")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, alerts, "Alerts fetched successfully"));
});

const getAlertsByAudience = asyncHandler(async (req, res) => {
  const { audience } = req.params;

  if (!["all", "volunteers", "admins"].includes(audience)) {
    throw new ApiError(400, "Invalid audience type");
  }

  const alerts = await Alert.find({ audience })
    .populate("disasterId", "type description location severity status")
    .sort({ createdAt: -1 });

  return res
     .status(200)
    .json(new ApiResponse(200, alerts, `Alerts for ${audience} fetched successfully`));
});

export {createAlert, getAllAlerts , getAlertsByAudience}