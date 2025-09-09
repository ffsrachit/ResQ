import { Router } from "express";
import { createDonation, getAllDonations, getDonationById, updateDonation, deleteDonation } from "../controllers/donation.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes (no authentication needed)
router.route("/getDono").get(getAllDonations);
router.route("/getDono/:id").get(getDonationById);

// Protected routes (authentication required)
router.route("/createDono").post(isAuthenticated, createDonation);
router.route("/updateDono/:id").put(isAuthenticated, updateDonation);
router.route("/deleteDono/:id").delete(isAuthenticated, deleteDonation);

export default router;