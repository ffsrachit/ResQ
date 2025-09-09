import { Disaster } from "../models/disaster.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new disaster
 const createDisaster = asyncHandler(async (req, res) => {
    const { type, description, location, severity } = req.body;

    if (!type) {
        throw new ApiError(400, "Disaster type is required");
    }

    const disaster = await Disaster.create({
        type,
        description,
        location,
        severity,
        reportedBy: req.userId 
    });

    return res
        .status(200) 
        .json(new ApiResponse(200, disaster, "Disaster created Successfully"));
});

// Get all disasters
 const getAllDisasters = asyncHandler(async (req, res) => {
    const disasters = await Disaster.find().populate("reportedBy", "name email");
    return res
        .status(200) 
        .json(new ApiResponse(200, disasters, "DIsasters fetched successfully"));

});

// Get single disaster by ID
 const getDisasterById = asyncHandler(async (req, res) => {
    const disaster = await Disaster.findById(req.params.id).populate("reportedBy", "name email");

    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

   return res
        .status(200) 
        .json(new ApiResponse(200, disaster, "Disaster fetched successfully"));
});

// Update a disaster
 const updateDisaster = asyncHandler(async (req, res) => {
    const disaster = await Disaster.findById(req.params.id);

    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    Object.assign(disaster, req.body); 
    await disaster.save();

    return res
        .status(200) // 200 OK for fetching data
        .json(new ApiResponse(200, disaster, "Disaster Updated successfully"));
});

// Delete a disaster
const deleteDisaster = asyncHandler(async (req, res) => {
    const disaster = await Disaster.findByIdAndDelete(req.params.id);

    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Disaster deleted successfully"));
});


export {createDisaster , getAllDisasters , getDisasterById , updateDisaster , deleteDisaster}
