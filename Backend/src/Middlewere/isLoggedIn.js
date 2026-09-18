import jwt from 'jsonwebtoken'
import ErrorHandler from "../Utlis/ErrorHandler.js";
import User from '../Models/User.Schema.js'
import validator from 'validator'

export const isLoggedIn = async(req, res, next) => {
    try {
        const { token } = req.cookies
        // Chcek token 
        if(!token){
            return next(new ErrorHandler(400, "Please before login.."))
        }

        if(!validator.isJWT(token)){
            return next(new ErrorHandler(400, "Invalid Token Please login valid token"))
        }

        // Verify token
        const originalToken =  jwt.verify(token, process.env.JWT_TOKEN)

        // findUser now
        const findUser = await User.findById(originalToken._id)

        // Chcek user 
        if(!findUser){
            return next(new ErrorHandler(400, "user not found "))
        }

       // Attach user to request
        req.user = findUser;

        // Move to next middleware/controller
        next();

    } catch (error) {
         next(error)
    }
}