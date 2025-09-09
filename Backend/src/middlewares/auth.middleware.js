import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

const isAuthenticated = asyncHandler(async (req, res, next) => {
   
        const token = req.cookies?.token

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!decodedToken) {
            throw new ApiError(401, "Invalid Token")
        }

        req.userId = decodedToken.userId;
        next();
})

export default isAuthenticated;