import { Router } from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

// Optional: Protect routes with authentication


router.post("/create", createResource);
router.get("/all", getAllResources);
router.get("/:id", getResourceById);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;
