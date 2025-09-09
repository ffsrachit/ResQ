import { Router } from "express";
import { createAlert, getAllAlerts, getAlertsByAudience } from "../controllers/alert.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

router.use(isAuthenticated);

router.post("/create", createAlert);
router.get("/all", getAllAlerts);
router.get("/audience/:audience", getAlertsByAudience);

export default router;
