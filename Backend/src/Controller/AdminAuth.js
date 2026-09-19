import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import Organization from "../Models/Owner.Schema.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import User from "../Models/User.Schema.js";

export const adminOrgCreate = async(req, res, next) => {
   try {
    const { id } = req.params
    if(!id || mongoose.Types.ObjectId.isValid(id)){
        next(new ErrorHandler(401, "invalid id"))
    }
    const { email , name , password } = req.body
    // Chcek email is valid or not
    if(!validator.isEmail(email)){
      return next(new ErrorHandler(400, `${email} is not valid email`))
    }

    // Pass chcek strong or not
     if ( !validator.isStrongPassword(password, 
      { 
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 1 
      })) 
      { 
        return next( 
          new 
          ErrorHandler( 
            400, 
            "Password: 8+ chars, 1 uppercase, 1 lowercase, 1 number & 1 special char." 
          )); 
      }
    // Chcek name is valid or not
    if(!name.trim() || name.trim().length < 2 || name.trim().length > 20){
      return next(new ErrorHandler(400, `${name} is invalid`))
    }

    const foundOrg = await Organization.findById(id)
    // chcek
    if(!foundOrg){
      return next(new ErrorHandler(404, "organization not found "))
    }
    // Organization incative chcek
    // if(!foundOrg.isActive){
    //   return next(new ErrorHandler(400, "Organization is incative"))
    // }

    // HasedPassword 
    const hasedPasswordOrg = await bcrypt.hash(password, 10)
    // Create admin 
    const AdminCreate = await User.create({
        name, 
        password : hasedPasswordOrg,
        email,
        role : "Admin",
        organizationId : id,
        isActive : foundOrg.isActive  // if org is active then admin active otherwise not
    })

    res.status(201)
    .json(
        new ResponseHandler(
          201,
          foundOrg.isActive ? `Admin created under organization ${foundOrg.name}` :
          `Admin created under organization ${foundOrg.name} which is currently is INCTIVE`,
          foundOrg
        )
    )
   } catch (error) {
     next(error)
   }
}