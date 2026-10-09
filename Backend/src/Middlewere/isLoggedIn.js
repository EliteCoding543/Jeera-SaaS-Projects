import jwt from "jsonwebtoken";
import ErrorHandler from "../Utlis/ErrorHandler.js";
import User from "../Models/User.Schema.js";
import validator from "validator";

export const isLoggedIn = async (req, res, next) => {
    try {


        const token = req.cookies?.token;

        if (!token) {
            return next(
                new ErrorHandler(401, "Authentication token missing")
            );
        }

        if (!validator.isJWT(token)) {
            return next(
                new ErrorHandler(401, "Invalid authentication token")
            );
        }

        const originalToken = jwt.verify(
            token,
            process.env.JWT_TOKEN
        );

        const findUser = await User.findById(originalToken._id)
            .populate("organizationId");

        if (!findUser) {
            return next(
                new ErrorHandler(401, "User not found")
            );
        }

        req.user = findUser;

        return next();
    } catch (error) {
        return next(error);
    }
};