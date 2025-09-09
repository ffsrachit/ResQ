import { asyncHandler } from "../utils/asyncHandler.js"; // wrapper isse hrr chiz ko try catch vagrha mein nhi dalna padgea
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password, role, skills, location } =
        req.body;

    const existedUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
    });

    if (existedUser) {
        throw new ApiError(409, "User already existed");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        skills,
        location,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, user, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    // For security, do not reveal if user exists or not
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });

    return res
        .status(200)
        .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json(new ApiResponse(200, { user }, "Welcome Back!"));
});

const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .clearCookie("token", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getUser = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    return res
        .status(200) // 200 OK for fetching data
        .json(new ApiResponse(200, users, "Users fetched successfully"));
});

export { registerUser , loginUser , logoutUser , getUser };
