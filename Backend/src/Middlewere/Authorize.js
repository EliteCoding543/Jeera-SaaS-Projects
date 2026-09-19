import ErrorHandler from "../Utlis/ErrorHandler.js";

export const authorize = (...roles) => {
    return (req, res, next) => {


        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(403, "Operation is unauthorized")
            );
        }

        next();
    };
};