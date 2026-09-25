import User from "../Models/User.Schema.js";
import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import  Task  from '../Models/Task.schema.js'
import mongoose from "mongoose";


export const createTask = async(req, res, next) => {
   try {
    const{ employeeId } = req.params
    // console.log(employeeId)
    if(!mongoose.Types.ObjectId.isValid(employeeId)){
        return next(new ErrorHandler(400, "inavlid Id"))
    }

    const foundEmployee = await User.findOne({
        _id : employeeId,
        organizationId : req.user.organizationId._id
    })

    if(!foundEmployee){
        return next(new ErrorHandler(404, "employee does not exists"))
    }

    const{title, description, status, priority } = req.body
    if(!title || !title.trim() || title.trim().length > 100){
        return next(new ErrorHandler(400, `inavlid ${title}`))
    }

    if(!description || !description.trim() || description.trim().length > 300){
        return next(new ErrorHandler(400, `inavlid is ${description}`))
    }

    if(!status || !status.trim() || !["todo", "in-progress", "completed"].includes(status.trim())){
        return next(new ErrorHandler(400, `inavlid status ${status}`))
    }

    if(!priority || !priority.trim() || !["low", "medium", "high"].includes(priority.trim())){
        return next(new ErrorHandler(400, `inavlid is priority ${priority}`))
    }

    // Create task 
    const createTask = await Task.create({
        title,
        description,
        priority,
        status,
        organizationId : req.user.organizationId._id,
        teamId : foundEmployee.teamId,
        assignedTo : employeeId,
        createdBy : req.user._id
    })

    res.status(200)
    .json(
        new ResponseHandler(
            200,
            "Task Created Successfuly",
            createTask
        )
    )
   } catch (error) {
     next(error)
   }
}

export const getAllTask = async(req, res, next) => {
    try {
        const allTask = await Task.find({organizationId : req.user.organizationId._id})

        res.status(200)
        .json(
            new ResponseHandler(
                200,
                "Get All Task Successfuly",
            { 
                totalTask : allTask.length,
                allTask
            }
            )
        )

    } catch (error) {
        next(error)
    }
}

export const getTaskById = async(req, res, next) => {
    try {
        const { taskId } = req.params
        if(!mongoose.Types.ObjectId.isValid(taskId)){
            return next(new ErrorHandler(400, "inavlid Id"))
        }

        const foundTask = await Task.findById({
            _id : taskId,
            organizationId : req.user.organizationId._id
        })

        res.status(200)
        .json(
            new ResponseHandler(
                200,
                "Fetch Task Successfuly by id",
                foundTask
            )
        )
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req, res, next) => {
    try {
        const { taskId } = req.params
        if(!mongoose.Types.ObjectId.isValid(taskId)){
            return next(new ErrorHandler(400, "inavlid id"))
        }

        const data = await Task.findByIdAndDelete({
            _id : taskId,
            organizationId : req.user.organizationId._id
        })

        res.status(200)
        .json(
            new ResponseHandler(
                200,
                "Task Deleted Successfuly",
                data
            )
        )
    } catch (error) {
        next(error)
    }
}

export const updatedTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return next(new ErrorHandler(400, "Invalid Task ID"));
        }

        const {
            title,
            description,
            status,
            priority,
            assignedTo
        } = req.body;

        if (!title?.trim() || title.trim().length > 100) {
            return next(
                new ErrorHandler(400, "Invalid title")
            );
        }

        if (!description?.trim() || description.trim().length > 300) {
            return next(
                new ErrorHandler(400, "Invalid description")
            );
        }

        if (
            !status?.trim() ||
            !["todo", "in-progress", "completed"].includes(status.trim())
        ) {
            return next(
                new ErrorHandler(400, "Invalid status")
            );
        }

        if (
            !priority?.trim() ||
            !["low", "medium", "high"].includes(priority.trim())
        ) {
            return next(
                new ErrorHandler(400, "Invalid priority")
            );
        }

        if (!teamId || !mongoose.Types.ObjectId.isValid(teamId)) {
            return next(
                new ErrorHandler(400, "Invalid Team ID")
            );
        }

        if (!assignedTo || !mongoose.Types.ObjectId.isValid(assignedTo)) {
            return next(
                new ErrorHandler(400, "Invalid Employee ID")
            );
        }

        const foundEmployee = await User.findById(assignedTo)
        if(!foundEmployee){
            return next(new ErrorHandler(404, `${foundEmployee} is does not exists`))
        }

        const updateTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                organizationId: req.user.organizationId._id
            },
            {
                title: title.trim(),
                description: description.trim(),
                status: status.trim(),
                priority: priority.trim(),
                teamId : foundEmployee.teamId,
                assignedTo
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateTask) {
            return next(
                new ErrorHandler(404, "Task not found")
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Task updated successfully",
                updateTask
            )
        );

    } catch (error) {
        next(error);
    }
};