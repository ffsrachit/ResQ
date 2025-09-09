import { Resource } from "../models/resource.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create Resource
export const createResource = asyncHandler(async (req, res) => {
    const { name, quantity, location, assignedToDisaster, status } = req.body;

    if (!name || !quantity) {
        throw new ApiError(400, "Name and quantity are required");
    }

    const resource = await Resource.create({
        name,
        quantity,
        location,
        assignedToDisaster,
        status,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, resource, "Resource created successfully"));
});

// Get All Resources
export const getAllResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find()
        .populate("assignedToDisaster", "type description location severity status")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, resources, "Resources fetched successfully"));
});

// Get Resource by ID
export const getResourceById = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id).populate(
        "assignedToDisaster",
        "type description location severity status"
    );

    if (!resource) {
        throw new ApiError(404, "Resource not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, resource, "Resource fetched successfully"));
});

// Update Resource (status, quantity, assign disaster, etc.)
export const updateResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!resource) {
        throw new ApiError(404, "Resource not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, resource, "Resource updated successfully"));
});

// Delete Resource
export const deleteResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
        throw new ApiError(404, "Resource not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Resource deleted successfully"));
});