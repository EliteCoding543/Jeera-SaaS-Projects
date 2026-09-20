import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import Organization from "../Models/Owner.Schema.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import User from "../Models/User.Schema.js";

// Admin Create by organization
export const adminOrgCreate = async(req, res, next) => {
   try {
    const { id } = req.params
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
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
    // find existingUser already exists or not 
    const existingUser = await User.findOne({email})
    if(existingUser){
        return next(
                new ErrorHandler(409, "Email already registered")
            );
    }
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
          foundOrg.isActive ? `Admin created under organization ${foundOrg.name} is Active` :
          `Admin created under organization ${foundOrg.name} which is currently is INCTIVE`,
          AdminCreate
        )
    )
   } catch (error) {
     next(error)
   }
}

// Get All Admin in organizations
export const getAllAdmin = async(req, res, next) => {
    try {
        const { id } = req.params //org id
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
          return next(new ErrorHandler(400, "invalid organization ID"))
        }
        // Found Organization
        const foundOrg = await Organization.findById(id)
        if(!foundOrg){
          return next(new ErrorHandler(404, "Organization is does not exists"))
        }
        // Found Admin in org 
        const findAdminOrg = await User.find({
          organizationId : foundOrg._id,
          role : "Admin"
        })

        res.status(200)
        .json(
          new ResponseHandler(
              200,
              foundOrg.isActive ? "Organization is Active" : "Organization is incative",
              findAdminOrg
          )
        )
    } catch (error) {
      next(error)
    }
}

// Get Admins By id
export const getAdminById = async(req, res, next) => {
  try {
    const { id } = req.params
    // Chcek Admins ID
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
      return next(new ErrorHandler(400, "invalid Admins Id"))
    }

    const findAdminsbyId = await User.findById(id)
    if(!findAdminsbyId){
      return next(new ErrorHandler(401, "Admins does not exists"))
    }

    const foundOrg = await Organization.findById(findAdminsbyId.organizationId)

    res.status(201)
    .json(
       new ResponseHandler(
         200,
         foundOrg.isActive ? "Organization is Active" : "Organization is incative",
         findAdminsbyId
       )
    )
  } catch (error) {
    next(error)
  }
}

// Active  Admins Details
export const activedAdmins = async(req, res, next) => {
  try {
    const { id } = req.params
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
      return next(new ErrorHandler(400, "invalid Admin ID"))
    }

    const foundAdmins = await User.findById(id)
    if(!foundAdmins){
      return next(new ErrorHandler(404, "Admin does not exists"))
    }

    foundAdmins.isActive = true

    foundAdmins.save()

    res.status(200)
    .json(
      new ResponseHandler(
        200,
        `${foundAdmins.name} is Activate successfuly`,
        foundAdmins
      )
    )

  } catch (error) {
    next(error)
  }
}

// dective Admins 
export const deactivateAdmins = async(req, res, next) => {
  try {
    const { id } = req.params
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
      return next(new ErrorHandler(400, "invalid Admin ID"))
    }

    const foundAdmins = await User.findById(id)
    if(!foundAdmins){
      return next(new ErrorHandler(404, "Admin does not exists"))
    }

    foundAdmins.isActive = false

    foundAdmins.save()

    res.status(200)
    .json(
      new ResponseHandler(
        200,
        `${foundAdmins.name} is Deactivate successfuly`,
        foundAdmins
      )
    )

  } catch (error) {
    next(error)
  }
}