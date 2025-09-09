import {Router} from "express"
import { registerUser , loginUser , logoutUser , getUser } from "../controllers/user.controller.js"

import isAuthenticated from "../middlewares/auth.middleware.js"

const router =Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/get").get( isAuthenticated, getUser)

export default router