import User from "../Models/User.Schema.js";
import ErrorHandler from "../Utlis/ErrorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ResponseHandler from "../Utlis/ResponseHandler.js";

// ================= LOGIN =================
export const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(
                new ErrorHandler(400, "Email or password is required...")
            );
        }

        // Find user in DB
        const foundUser = await User.findOne({ email });

        // Check user exists
        if (!foundUser) {
            return next(
                new ErrorHandler(404, "User not found")
            );
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isPasswordCorrect) {
            return next(
                new ErrorHandler(400, "Invalid credentials")
            );
        }

        // Create JWT token
        const token = jwt.sign(
            { _id: foundUser._id },
            process.env.JWT_TOKEN,
            {
                expiresIn: "1d"
            }
        );

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            .json(
                new ResponseHandler(
                    200,
                    "User logged in successfully",
                    foundUser
                )
            );

    } catch (error) {
        next(error);
    }
};

// ================= LOGOUT =================
export const LogoutUser = async (req, res, next) => {
    try {
        return res
            .status(200)
            .clearCookie("token")
            .json(
                new ResponseHandler(
                    200,
                    "User logged out successfully",
                )
            );

    } catch (error) {
        next(error);
    }
};


// ================= OWN PROFILE =================

export const ownProfile = async (req, res, next) => {
    try {

        return res
            .status(200)
            .json(
                new ResponseHandler(
                    200,
                    "Profile fetched successfully",
                    req.user
                )
            );

    } catch (error) {
        next(error);
    }
};

