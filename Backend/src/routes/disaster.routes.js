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
// router.use(isAuthenticated);

// Routes
router.route("/create").post(createDisaster);
router.route("/getD").get(getAllDisasters);
router.route("/getS/:id").get(getDisasterById);        
router.route("/update/:id").put(updateDisaster);      
router.route("/delete/:id").delete(deleteDisaster);    

export default router;