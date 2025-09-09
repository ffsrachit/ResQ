import { Donation } from "../models/donation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new donation
 const createDonation = asyncHandler(async (req, res) => {
  const { type, amount, resourceDetails } = req.body;

  if (!type) {
    throw new ApiError(400, "Donation type is required");
  }

  // Validate based on type
  if (type === "money" && !amount) {
    throw new ApiError(400, "Amount is required for money donations");
  }
  if (type === "resource" && (!resourceDetails?.name || !resourceDetails?.quantity)) {
    throw new ApiError(400, "Resource name and quantity are required for resource donations");
  }

  const donation = await Donation.create({
    donorId: req.userId, // assumes user is logged in
    type,
    amount,
    resourceDetails,
  });

   return res
        .status(200) 
        .json(new ApiResponse(201, donation, "Donation created Successfully"));
});

// Get all donations
 const getAllDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find().populate("donorId", "name email");
  return res
        .status(200) 
        .json(new ApiResponse(200, donations, "Donations fetched Successfully"));
});

// Get single donation by ID
 const getDonationById = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id).populate("donorId", "name email");

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  return res
        .status(200) 
        .json(new ApiResponse(200, donation, "Donation fetched Successfully"));
  
});

// Update donation (e.g., mark as completed)

  
const updateDonation = asyncHandler(async (req, res) => {
  const { status } = req.body;

  // Validate status
  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const allowedStatuses = ["pending", "completed"];
  if (!allowedStatuses.includes(status.toLowerCase())) {
    throw new ApiError(
      400,
      `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`
    );
  }

  const donation = await Donation.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: status.toLowerCase(),
      },
    },
    {
      new: true, // return updated document
      runValidators: true, // apply schema validation
    }
  );

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, donation, "Donation updated successfully"));
});

// Delete donation
 const deleteDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  await Donation.deleteOne({ _id: req.params.id });

  return res
        .status(200) 
        .json(new ApiResponse(200, null, "Donation deleted Successfully"));
});


export {createDonation , getAllDonations , getDonationById , updateDonation,deleteDonation}
