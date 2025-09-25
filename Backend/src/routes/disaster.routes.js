import { Router } from "express";
import {
    createDisaster,
    getAllDisasters,
    getDisasterById,
    updateDisaster,
    deleteDisaster
} from "../controllers/disaster.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all routes


// Routes
router.route("/create").post(isAuthenticated ,createDisaster);
router.route("/getD").get(getAllDisasters);
router.route("/getS/:id").get(getDisasterById);        
router.route("/update/:id").put(isAuthenticated ,updateDisaster);      
router.route("/delete/:id").delete(isAuthenticated,deleteDisaster);    

export default router;