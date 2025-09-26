import { Router } from "express";
import {
createVolAssign,
getAllAssignments,
getAssignmentsByUser,
updateAssignment,
deleteAssignment,
} from "../controllers/volunteerassignment.controller.js"

const router = Router();



router.post("/create", createVolAssign);
router.get("/all", getAllAssignments);
router.get("/user/:userId", getAssignmentsByUser);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;