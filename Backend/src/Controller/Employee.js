import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import {Team} from "../Models/Teams.Schema.js"
import  User from "../Models/User.Schema.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";

export const createEmployee = async(req, res, next) => {
    try {
        const { teamId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(teamId)){
            return next(new ErrorHandler(400, "Invalid ID"))
        }

        const foundTeam = await Team.findOne({
            _id : teamId,
            organizationId : req.user.organizationId._id
        })

        if(!foundTeam){
            return next(new ErrorHandler(404, "Teams does not exists"))
        }

        const { name , email, password} = req.body;
        if(!name.trim() || name.trim().length > 20 || name.trim().length < 5){
            return next(new ErrorHandler(400, `${name} is Invalid`))
        }

        if(!validator.isEmail(email)){
            return next(new ErrorHandler(400, `${email} is not valid email`))
        }

        if(!validator.isStrongPassword(password)){
            return next(new ErrorHandler(400, `${password} should be Strong password`))
        }

        // Password hashed
        const hashedPassword = await bcrypt.hash(password, 10)
        
        // Create Employees
        const createUser = await User.create({
            password : hashedPassword,
            name,
            email,
            role : 'employee',
            organizationId : req.user.organizationId._id,
            teamId : teamId
        })

        // Send Response 
        res.status(200)
        .json(
            new ResponseHandler(
                200,
                `Employee (${name}) created successfully`,
                createUser
            )
        )
    } catch (error) {
        next(error)
    }
}

export const getAllEmployee = async (req, res, next) => {
    try {
        const { teamId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return next(
                new ErrorHandler(400, "Invalid Team ID")
            );
        }

        const allEmployees = await User.find({
            teamId,
            organizationId: req.user.organizationId._id,
            role: "employee",
            isActive: true
        });

        return res.status(200).json(
            new ResponseHandler(
                200,
                "All Employees fetched successfully",
                {
                    employees: allEmployees,
                    totalEmployees: allEmployees.length
                }
            )
        );

    } catch (error) {
        next(error);
    }
};

export const getEmployeeById = async (req, res, next) => {
    try {
        const { employeeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return next(
                new ErrorHandler(400, "Invalid Employee ID")
            );
        }

        const employee = await User.findOne({
            _id: employeeId,
            organizationId: req.user.organizationId._id,
            role: "employee"
        });

        if (!employee) {
            return next(
                new ErrorHandler(404, "Employee does not exist")
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Employee fetched successfully",
                employee
            )
        );

    } catch (error) {
        next(error);
    }
};

export const deleteEmployee = async(req, res, next) => {
    try {
        const { employeeId } = req.params
        if(!mongoose.Types.ObjectId.isValid(employeeId)){
            return next(new ErrorHandler(400, "Invalid Id"))
        }

        const foundEmployee = await User.findOne({
            _id : employeeId,
            organizationId : req.user.organizationId._id
        })

        if(!foundEmployee){
            return next(new ErrorHandler(404, "User does not exists"))
        }

        foundEmployee.isActive = false
        foundEmployee.save()

        res.status(200)
        .json(
            new ResponseHandler(
                200,
                "User Is Deactived successfully",
                foundEmployee
            )
        )

    } catch (error) {
        next(error)
    }
}

export const updateEmployee = async(req, res, next) => {
    try {
        const{ employeeId } = req.params
        if(!mongoose.Types.ObjectId.isValid(employeeId)){
            return next(new ErrorHandler(401, "Invalid is Id"))
        }


        // const foundEmployee = await User.findOne({
        //     _id : employeeId,
        //     organizationId : req.user.organizationId._id
        // })


        // if(!foundEmployee)
        // {
        //     throw new AppError(404, "User does not exists")
        // }
        

        const{teamId, isActive} = req.body
        // foundEmployee.teamdId = teamId
        // foundEmployee.isActive = isActive

        const foundEmployee = await User.findOneAndUpdate(
            {_id : employeeId, organizationId : req.user.organizationId._id}, 
            {teamdId : teamId, isActive}, 
            { runValidators : true, returnDocument : "after" })

          User.fin


        // await foundEmployee.save()

        res
        .status(200)
        .json(
            new ResponseHandler(
                200,
                "update Employee successfully",
                foundEmployee
            )
        )


    } catch (error) {
        next(error)
    }
}