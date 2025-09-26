import { Router } from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";


const router = Router();




router.post("/create", createResource);
router.get("/all", getAllResources);
router.get("/:id", getResourceById);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;
