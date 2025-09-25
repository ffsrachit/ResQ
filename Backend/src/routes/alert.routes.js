import { Router } from "express";
import { createAlert, getAllAlerts, getAlertsByAudience } from "../controllers/alert.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();



router.post("/create", isAuthenticated ,createAlert);
router.get("/all", getAllAlerts);
router.get("/audience/:audience", getAlertsByAudience);

export default router;
