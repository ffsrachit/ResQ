import { Volassign } from "../models/volunteerassignment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create Volunteer Assignment
export const createVolAssign = asyncHandler(async (req, res) => {
    const { userId, disasterId, task } = req.body;

    if (!userId || !disasterId || !task) {
        throw new ApiError(400, "userId, disasterId and task are required");
    }

    const assignment = await Volassign.create({
        userId,
        disasterId,
        task,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, assignment, "Volunteer assigned successfully"));
});

// Get All Assignments
export const getAllAssignments = asyncHandler(async (req, res) => {
    const assignments = await Volassign.find()
        .populate("userId", "name email phoneNumber role")
        .populate("disasterId", "type description location severity status")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, assignments, "Assignments fetched successfully"));
});

// Get Assignments by Volunteer (userId)
export const getAssignmentsByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const assignments = await Volassign.find({ userId })
        .populate("disasterId", "type description location severity status")
        .sort({ createdAt: -1 });

    if (!assignments.length) {
        throw new ApiError(404, "No assignments found for this user");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, assignments, "Assignments fetched successfully"));
});

// Update Assignment (status or task)
export const updateAssignment = asyncHandler(async (req, res) => {
    const assignment = await Volassign.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!assignment) {
        throw new ApiError(404, "Assignment not found");
    }

     return res
        .status(200)
        .json(new ApiResponse(200, assignment, "Assignment updated successfully"));
});

// Delete Assignment
export const deleteAssignment = asyncHandler(async (req, res) => {
    const assignment = await Volassign.findByIdAndDelete(req.params.id);

    if (!assignment) {
        throw new ApiError(404, "Assignment not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Assignment deleted successfully"));
});